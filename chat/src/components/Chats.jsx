import React, { useContext, useEffect, useState } from "react";
import { List, Avatar, Typography } from 'antd';
import { doc, onSnapshot } from "firebase/firestore";
import { firestore as db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import bean from "../img/bean.png";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const { Text, Paragraph } = Typography;

  useEffect(() => {
    if (currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const fetchedChats = doc.data() ? Object.entries(doc.data()) : [];
        setChats(fetchedChats.sort((a, b) => b[1].date - a[1].date));
      });

      return () => unsub();
    }
  }, [currentUser.uid]);

  const handleSelect = (chat) => {
    dispatch({ type: "CHANGE_USER", payload: chat });
  };

  return (
    <List
      className="chats"
      dataSource={chats}
      renderItem={([key, chat]) => {
        // Only render chats that have a last message
        if (chat[0] != null) {
          return (
            <List.Item
              key={key}
              className="userChat"
              onClick={() => handleSelect(chat)}
            >
              <List.Item.Meta
                avatar={<Avatar src={chat.photoURL || bean} />}
                title={<Text>{chat.displayName}</Text>}
                description={<Paragraph>{chat.lastMessage.text}</Paragraph>}
              />
            </List.Item>
          );
        }
        return null;
      }}
    />
  );
};

export default Chats;



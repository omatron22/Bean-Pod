import React, { useContext, useEffect, useState } from "react";
import { List, Avatar, Typography } from 'antd';
import { doc, onSnapshot } from "firebase/firestore";
import { firestore as db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserOutlined } from '@ant-design/icons';
import bean from "../img/bean.png";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const { Text, Paragraph } = Typography;

  useEffect(() => {
    if (currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (docSnapshot) => {
        const fetchedChats = docSnapshot.data() ? Object.entries(docSnapshot.data()) : [];
        setChats(fetchedChats.sort((a, b) => b[1].date - a[1].date));
      });

      return () => unsub();
    }
  }, [currentUser.uid]);

  const handleSelect = (chat) => {
    dispatch({ type: "CHANGE_USER", payload: chat });
  };

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <List
      className="chats"
      dataSource={chats}
      renderItem={([key, chat]) => (
        <List.Item
          key={chat[0]}
          className="userChat"
          onClick={() => handleSelect(chat[1])}
        >
          <List.Item.Meta
            avatar src={chat[1].photoURL ? chat[1].photoURL : bean}
            title={<Text>{chat[1].displayName || 'Unknown User'}</Text>}
            description={<Paragraph>{chat[1].lastMessage?.text || 'No message yet'}</Paragraph>}
          />
        </List.Item>
      )}
    />
  );
};

export default Chats;


// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
// import { firestore as db } from "../firebase";
// import Message from "./Message";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const { data } = useContext(ChatContext);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//       doc.exists() && setMessages(doc.data().messages);
//     });

//     return () => {
//       unSub();
//     };
//   }, [data.chatId]);

//   console.log(messages)

//   return (
//     <div className="messages">
//       {messages.map((m) => (
//         <Message message={m} key={m.id} />
//       ))}
//     </div>
//   );
// };

// export default Messages;

import React, { useContext, useEffect, useState } from "react";
import { List, Avatar } from 'antd';
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { firestore as db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <List
      className="messages-list"
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(m) => (
        <List.Item>
          <List.Item.Meta
            title={<Message message={m} />}
            //description={message.lastMessage ? formatTimestamp(message.lastMessage.timestamp) : 'No messages yet'}
          />
        </List.Item>
      )}
    />
  );
};

export default Messages;

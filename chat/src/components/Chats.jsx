// // import { doc, onSnapshot } from "firebase/firestore";
// // import React, { useContext, useEffect, useState } from "react";
// // import { ChatContext } from "../context/ChatContext";
// // import { AuthContext } from "../context/AuthContext";
// // import { firestore as db } from "../firebase"; // Ensure this import is correct

// // const Chats = () => {
// //   const [chats, setChats] = useState([]);
// //   const { dispatch } = useContext(ChatContext);
// //   const { currentUser } = useContext(AuthContext);

// //   useEffect(() => {
// //     const getChats = () => {
// //       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
// //         setChats(doc.data());
// //         console.log("currentUser.uid: ", currentUser.uid);
// //         console.log("Current data: " , doc.data());
// //       });

// //       return () => {
// //         unsub();
// //       };
// //     };

// //     currentUser.uid && getChats();
// //   }, [currentUser.uid]);

  

// //   const handleSelect = (u) => {
// //     console.log("changing user");
// //     dispatch({ type: "CHANGE_USER", payload: u });
// //   };

  // return (
  //   <div className="chats">
  //     {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
  //       <div
  //         className="userChat"
  //         key={chat[0]}
  //         onClick={() => handleSelect(chat[1])}
  //       >
  //         <img src={chat[1].photoURL} alt="" />
  //         <div className="userChatInfo">
  //           <span>{chat[1].displayName}</span>
  //           <p>{chat[1].lastMessage?.text}</p>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
// // };

// // export default Chats;

import React, { useContext, useEffect, useState } from "react";
import { List, Avatar, Typography } from 'antd';
import { doc, onSnapshot } from "firebase/firestore";
import { firestore as db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const { Text, Paragraph } = Typography;

  useEffect(() => {
    if (currentUser.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => unsub();
    }
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // return (
  //   <List
  //     itemLayout="horizontal"
  //     dataSource={Object.entries(chats).sort((a,b)=>b[1].date - a[1].date)}
  //     renderItem={([key, chat]) => (
  //       <List.Item onClick={() => handleSelect(chat[1])} key={chat[0]}>
  //         <List.Item.Meta
  //           //avatar={<Avatar src={chat[1].photoURL} />}
  //           title={chat[1].displayName}
  //           //description={chat[1].lastMessage.date}
  //         />
  //       </List.Item>
  //     )}
  //   />
  // );
  // return (
  //   <List
  //     itemLayout="horizontal"
  //     dataSource={Object.entries(chats).sort((a,b)=>b[1].date - a[1].date)}
  //     renderItem={([key, chat]) => (
  //       <List.Item onClick={() => handleSelect(chat.userInfo)} key={key}>
  //         <List.Item.Meta
  //           //avatar={<Avatar src={chat.userInfo.photoURL} />}
  //           title={chat.userInfo.displayName}
  //           //description={chat.lastMessage.date}
  //         />
  //       </List.Item>
  //     )}
  //   />
  // );

  return (
    <List
      className="chats"
      dataSource={Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)}
      renderItem={chat => (
        <List.Item
          key={chat[0]}
          className="userChat"
          onClick={() => handleSelect(chat[1])}
        >
          <List.Item.Meta
            avatar={<Avatar src={chat[1].photoURL} />}
            title={<Text>{chat[1].displayName}</Text>}
            description={<Paragraph>{chat[1].lastMessage?.text}</Paragraph>}
          />
        </List.Item>
      )}
    />
  );
};

export default Chats;
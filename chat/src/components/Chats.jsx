// import React, { useContext, useEffect, useState } from "react";
// import { List, Avatar, Typography } from 'antd';
// import { doc, onSnapshot } from "firebase/firestore";
// import { firestore as db } from "../firebase";
// import { ChatContext } from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContext";

// const Chats = () => {
//   const [chats, setChats] = useState([]);
//   const { dispatch } = useContext(ChatContext);
//   const { currentUser } = useContext(AuthContext);
//   const { Text, Paragraph } = Typography;

//   useEffect(() => {
//     if (currentUser.uid) {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => unsub();
//     }
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <List
//       className="chats"
//       dataSource={Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date)}
//       renderItem={chat => (
//         <List.Item
//           key={chat[0]}
//           className="userChat"
//           onClick={() => handleSelect(chat[1])}
//         >
//           <List.Item.Meta
//             avatar={<Avatar src={chat[1].photoURL} />}
//             title={<Text>{chat[1].displayName}</Text>}
//             description={<Paragraph>{chat[1].lastMessage?.text}</Paragraph>}
//           />
//         </List.Item>
//       )}
//     />
//   );
// };

// export default Chats;

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
      renderItem={([key, chat]) => (
        <List.Item
          key={key}
          className="userChat"
          onClick={() => handleSelect(chat)}
        >
          <List.Item.Meta
            avatar={<Avatar src={chat.photoURL || 'fallback-image-url'} />}
            title={<Text>{chat.displayName}</Text>}
            description={<Paragraph>{chat.lastMessage?.text}</Paragraph>}
          />
        </List.Item>
      )}
    />
  );
};

export default Chats;

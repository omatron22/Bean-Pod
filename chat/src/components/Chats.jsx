// import React from 'react'

// const Chats = () => {
//   return (
//     <div className="chats">
//       <div className = "userChat">
//         <img src = "https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
//         <div className = "userChatInfo">
//           <span>Jane</span>
//           <p>Hello</p>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Chats

//V1--------------

// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { firestore as db, auth } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null); // To store the selected chat

//   useEffect(() => {
//     if (auth.currentUser) {
//       const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => unsubscribe();
//     }
//   }, [auth.currentUser]);

//   const handleSelect = (userInfo) => {
//     setSelectedChat(userInfo);
//     // Here you can handle additional logic that occurs when a chat is selected
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
//         <div
//           className="userChat"
//           key={chat[0]}
//           onClick={() => handleSelect(chat[1].userInfo)}
//         >
//           <img src={chat[1].userInfo.photoURL} alt={chat[1].userInfo.displayName} />
//           <div className="userChatInfo">
//             <span>{chat[1].userInfo.displayName}</span>
//             <p>{chat[1].lastMessage?.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chats;

//V2---------------------

// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContext";
// import { firestore as db, auth } from "../firebase"; // Ensure this import is correct

// const Chats = () => {
//   const [chats, setChats] = useState([]);
//   const { dispatch } = useContext(ChatContext);
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
//         <div
//           className="userChat"
//           key={chat[0]}
//           onClick={() => handleSelect(chat[1].userInfo)}
//         >
//           <img src={chat[1].userInfo.photoURL} alt={chat[1].userInfo.displayName} />
//           <div className="userChatInfo">
//             <span>{chat[1].userInfo.displayName}</span>
//             <p>{chat[1].lastMessage?.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chats;

import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { firestore as db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;

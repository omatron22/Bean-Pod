// import React, { useContext, useState } from "react";
// import { Input, List, Avatar, message } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { firestore as db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => setUser(doc.data()));
//       } else {
//         message.error('User not found');
//         setUser(null);
//       }
//     } catch (err) {
//       message.error('Error occurred during search');
//     }
//   };

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
    
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
        
//     const docRef = doc(db, "chats", combinedId);

//     console.log("combinedId: ", combinedId);
//     console.log("userId: ", user.uid);
//     console.log("currentUser.uid ", currentUser.uid);
    
        

//     try {
//       const res = await getDoc(docRef);
//       console.log(res);

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(docRef, { messages: [] });

//         //create user chats
//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//             [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//             [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {}

//     dispatch({ type: "CHANGE_USER", payload: user });
    

//     setUser(null);
//     setUsername("")
//   };

//   return (
//     <div className="search">
//       <Input.Search
//         placeholder="Find a user"
//         enterButton
//         onSearch={handleSearch}
//         onChange={(e) => setUsername(e.target.value)}
//         value={username}
//       />
//       {user && (
//         <List.Item onClick={handleSelect}>
//           <List.Item.Meta
//             avatar={<Avatar src={user.photoURL || <UserOutlined />} />}
//             title={user.displayName}
//           />
//         </List.Item>
//       )}
//     </div>
//   );
// };

// export default Search;

// import React, { useContext, useState } from "react";
// import { Input, List, Avatar, message } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { firestore as db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => setUser(doc.data()));
//       } else {
//         message.error('User not found');
//         setUser(null);
//       }
//     } catch (err) {
//       message.error('Error occurred during search');
//     }
//   };

//   const handleSelect = async () => {
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
    
//     const docRef = doc(db, "chats", combinedId);

//     try {
//       const res = await getDoc(docRef);

//       if (!res.exists() || !isChatDataComplete(res.data())) {
//         if (!res.exists()) {
//           await setDoc(docRef, { messages: [] });
//         }

//         await updateOrCreateUserChat(doc(db, "userChats", currentUser.uid), user, combinedId);
//         await updateOrCreateUserChat(doc(db, "userChats", user.uid), currentUser, combinedId);
//       }

//       dispatch({ type: "CHANGE_USER", payload: user });
//     } catch (err) {
//       console.error("Error in handleSelect:", err);
//     }

//     setUser(null);
//     setUsername("");
//   };

//   const isChatDataComplete = (data) => {
//     const requiredFields = ['uid', 'displayName', 'photoURL', 'date'];
//     return requiredFields.every(field => field in data);
//   };

//   const updateOrCreateUserChat = async (userChatDocRef, user, combinedId) => {
//     await updateDoc(userChatDocRef, {
//       uid: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       [combinedId + ".date"]: serverTimestamp(),
//     }, { merge: true });
//   };

//   return (
//     <div className="search">
//       <Input.Search
//         placeholder="Find a user"
//         enterButton
//         onSearch={handleSearch}
//         onChange={(e) => setUsername(e.target.value)}
//         value={username}
//       />
//       {user && (
//         <List.Item onClick={handleSelect}>
//           <List.Item.Meta
//             avatar={<Avatar src={user.photoURL || UserOutlined} />}
//             title={user.displayName}
//           />
//         </List.Item>
//       )}
//     </div>
//   );
// };

// export default Search;

// import React, { useContext, useState } from "react";
// import { Input, List, Avatar, message, Spin } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { firestore as db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   const handleSearch = async () => {
//     setIsLoading(true); // Start loading
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => setUser(doc.data()));
//       } else {
//         message.error('User not found');
//         setUser(null);
//       }
//     } catch (err) {
//       message.error('Error occurred during search');
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const handleSelect = async () => {
//     setIsLoading(true); // Start loading
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;

//     const docRef = doc(db, "chats", combinedId);

//     try {
//       const res = await getDoc(docRef);

//       if (!res.exists() || !isChatDataComplete(res.data())) {
//         if (!res.exists()) {
//           await setDoc(docRef, { messages: [] });
//         }

//         await updateOrCreateUserChat(doc(db, "userChats", currentUser.uid), user, combinedId);
//         await updateOrCreateUserChat(doc(db, "userChats", user.uid), currentUser, combinedId);
//       }

//       dispatch({ type: "CHANGE_USER", payload: user });
//     } catch (err) {
//       console.error("Error in handleSelect:", err);
//     } finally {
//       setIsLoading(false); // Stop loading
//       setUser(null);
//       setUsername("");
//     }
//   };

//   const isChatDataComplete = (data) => {
//     const requiredFields = ['uid', 'displayName', 'photoURL', 'date'];
//     return requiredFields.every(field => field in data);
//   };

//   const updateOrCreateUserChat = async (userChatDocRef, user, combinedId) => {
//     await updateDoc(userChatDocRef, {
//       uid: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       [combinedId + ".date"]: serverTimestamp(),
//     }, { merge: true });
//   };

//   if (isLoading) {
//     return <div className="loading-container"><Spin size="large" /></div>;
//   }

//   return (
//     <div className="search">
//       <Input.Search
//         placeholder="Find a user"
//         enterButton
//         onSearch={handleSearch}
//         onChange={(e) => setUsername(e.target.value)}
//         value={username}
//       />
//       {user && (
//         <List.Item onClick={handleSelect}>
//           <List.Item.Meta
//             avatar={<Avatar src={user.photoURL || UserOutlined} />}
//             title={user.displayName}
//           />
//         </List.Item>
//       )}
//     </div>
//   );
// };

// export default Search;

import React, { useContext, useState } from "react";
import { Input, List, Avatar, message, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { firestore as db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import bean from "../img/bean.png";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // const handleSearch = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("displayName", "==", username)
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach((doc) => setUser(doc.data()));
  //     } else {
  //       message.error('User not found');
  //       setUser(null);
  //     }
  //   } catch (err) {
  //     message.error('Error occurred during search');
  //   }
  // };

  // const handleSelect = async () => {
  //   setIsLoading(true); // Start loading on select
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;

  //   const docRef = doc(db, "chats", combinedId);

  //   try {
  //     const res = await getDoc(docRef);

  //     if (!res.exists()
  //     {
  //         await setDoc(docRef, { messages: [] });
  //         {

  //         }

  //       await updateOrCreateUserChat(doc(db, "userChats", currentUser.uid), user, combinedId);
  //       await updateOrCreateUserChat(doc(db, "userChats", user.uid), currentUser, combinedId);
  //     }

  //     dispatch({ type: "CHANGE_USER", payload: user });
      
  //   } catch (err) {
  //     console.error("Error in handleSelect:", err);
  //     setIsLoading(false); // Stop loading in case of error
  //   } finally {
  //     setUser(null);
  //     setUsername("");
  //   }
  // };

  // const isChatDataComplete = (data) => {
  //   const requiredFields = ['uid', 'displayName', 'photoURL', 'date'];
  //   return requiredFields.every(field => field in data);
  // };

  // const updateOrCreateUserChat = async (userChatDocRef, user, combinedId) => {
  //   await updateDoc(userChatDocRef, {
  //     uid: user.uid,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     [combinedId + ".date"]: serverTimestamp(),
  //   }, { merge: true });
  // };

  // if (isLoading) {
  //   return <div className="loading-container"><Spin size="large" /></div>;
  // }

    const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => setUser(doc.data()));
      } else {
        message.error('User not found');
        setUser(null);
      }
    } catch (err) {
      message.error('Error occurred during search');
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        
    const docRef = doc(db, "chats", combinedId);

    console.log("combinedId: ", combinedId);
    console.log("userId: ", user.uid);
    console.log("currentUser.uid ", currentUser.uid);
    
        

    try {
      const res = await getDoc(docRef);
      console.log(res);

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(docRef, { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    dispatch({ type: "CHANGE_USER", payload: user });
    

    setUser(null);
    setUsername("")
  };

  return (
    <div className="search">
      <Input.Search
        placeholder="Find a user"
        enterButton
        onSearch={handleSearch}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      {user && (
        <List.Item onClick={handleSelect}>
          <List.Item.Meta
            avatar src={chat[1].photoURL ? chat[1].photoURL : bean}
            title={user.displayName}
          />
        </List.Item>
      )}
    </div>
  );
};

export default Search;

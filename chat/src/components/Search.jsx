// import React, { useState, useEffect } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { auth, firestore as db } from "../firebase"; // Ensure this import is correct

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         // Optionally handle the case where there is no user logged in
//       }
//     });

//     return () => unsubscribe(); // Clean up the subscription
//   }, []);

//   const handleSearch = async () => {
//     setErr(false);

//     if (!username.trim()) {
//       setErr(true);
//       return;
//     }

//     const q = query(collection(db, "users"), where("displayName", "==", username));

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => {
//           setUser(doc.data());
//         });
//       } else {
//         setUser(null);
//         setErr(true);
//       }
//     } catch (error) {
//       console.error("Error in user search: ", error);
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.code === "Enter") {
//       handleSearch();
//     }
//   };

//   // // This function can be further expanded based on your app's functionality
//   // const handleSelect = () => {
//   //   // Implement what happens when a user is selected
//   //   console.log("User selected:", user);
//   // };
//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {}

//     setUser(null);
//     setUsername("")

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {err && <span>User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt={user.displayName} />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
//       }
      
// };
// export default Search;



import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc, // This was missing
  setDoc,
  doc,
  updateDoc,
  serverTimestamp, // This was missing
} from "firebase/firestore";
import { auth, firestore as db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const handleSearch = async () => {
    setErr(false);
    if (!username.trim()) {
      setErr(true);
      return;
    }

    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null);
        setErr(true);
      }
    } catch (error) {
      console.error("Error in user search: ", error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { // It's 'key', not 'code'
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (!currentUser || !user) {
      setErr(true);
      return; // Add error handling if either user is not found
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error creating or accessing chat: ", error);
      setErr(true);
    }

    // Resetting the states after selection
    setUser(null);
    setUsername("");
  };

  // Now we return the JSX correctly from the component
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;


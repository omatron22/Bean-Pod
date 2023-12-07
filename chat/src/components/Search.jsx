import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore as db } from "../firebase"; // Ensure this import is correct

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Optionally handle the case where there is no user logged in
      }
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
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
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
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  // This function can be further expanded based on your app's functionality
  const handleSelect = () => {
    // Implement what happens when a user is selected
    console.log("User selected:", user);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          //value style="width: 222px;"
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

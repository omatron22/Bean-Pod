// import React, { useContext, useState } from "react";
// import { Input as AntInput, Button, Upload } from 'antd';
// import { PictureOutlined, SendOutlined } from '@ant-design/icons';
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { firestore as db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [imgFile, setImgFile] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (text.trim() === "" && !imgFile) {
//       return; // Avoid sending empty messages
//     }

//     if (imgFile) {
//       const storageRef = ref(storage, `images/${uuid()}`);
//       const uploadTask = uploadBytesResumable(storageRef, imgFile);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           // Optional: Handle upload progress
//         },
//         (error) => {
//           console.error("Image upload error:", error);
//           // Reset the image file state
//           setImgFile(null);
//         },
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           await sendMessage(text, downloadURL);
//           setImgFile(null); // Reset imgFile state
//         }
//       );
//     } else {
//       await sendMessage(text);
//     }
//   };

//   const sendMessage = async (text, img = null) => {
//     const messageData = {
//       id: uuid(),
//       text,
//       senderId: currentUser.uid,
//       date: Timestamp.now(),
//       img,
//     };

//     await updateDoc(doc(db, "chats", data.chatId), {
//       messages: arrayUnion(messageData),
//     });

//     const lastMessageUpdate = {
//       [data.chatId + ".lastMessage"]: { text: text || 'Image', date: serverTimestamp() },
//     };

//     await updateDoc(doc(db, "userChats", currentUser.uid), lastMessageUpdate);
//     await updateDoc(doc(db, "userChats", data.user.uid), lastMessageUpdate);

//     setText(""); // Reset the text input
//   };

//   const uploadProps = {
//     beforeUpload: file => {
//       setImgFile(file);
//       return false; // Prevent auto-uploading
//     },
//     fileList: [], // Not displaying any file list
//   };

//   return (
//     <div className="input">
//       <AntInput
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//         addonAfter={
//           <div>
//             <Upload {...uploadProps} showUploadList={false}>
//               <PictureOutlined />
//             </Upload>
//             <Button icon={<SendOutlined />} onClick={handleSend}></Button>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState } from "react";
import { Input as AntInput, Button, Upload } from 'antd';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore as db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() === "" && !imgFile) {
      return; // Avoid sending empty messages
    }

    if (imgFile) {
      const storageRef = ref(storage, `images/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Handle upload progress
        },
        (error) => {
          console.error("Image upload error:", error);
          setImgFile(null); // Reset the image file state
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await sendMessage(text, downloadURL);
          setImgFile(null); // Reset imgFile state
        }
      );
    } else {
      await sendMessage(text);
    }
  };

  const sendMessage = async (text, imgURL = null) => {
    const messageData = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
      img: imgURL,
      // Image element is not stored but will be rendered in the message component
    };

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(messageData),
    });

    const lastMessageUpdate = {
      [data.chatId + ".lastMessage"]: { text: text || 'Image', date: serverTimestamp() },
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), lastMessageUpdate);
    await updateDoc(doc(db, "userChats", data.user.uid), lastMessageUpdate);

    setText(""); // Reset the text input
  };

  const uploadProps = {
    beforeUpload: file => {
      setImgFile(file);
      return false; // Prevent auto-uploading
    },
    fileList: [], // Not displaying any file list
  };

  return (
    <div className="input">
      <AntInput
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        addonAfter={
          <div>
            <Upload {...uploadProps} showUploadList={false}>
              <PictureOutlined />
            </Upload>
            <Button icon={<SendOutlined />} onClick={handleSend}></Button>
          </div>
        }
      />
    </div>
  );
};

export default Input;


// import React, { useContext, useState } from "react";
// import Img from "../img/img.svg";
// import Attach from "../img/attach.svg";
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
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           console.log("image failed to upload");
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };
//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <img src={Attach} alt="" />
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
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
    if (imgFile) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        'state_changed',
        (error) => {
          console.log("image failed to upload");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await sendMessage(text, downloadURL);
        }
      );
    } else {
      await sendMessage(text);
    }
  };

  const sendMessage = async (text, img = null) => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        img,
      }),
    });

    // Update userChats for both sender and receiver
    const lastMessageUpdate = {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), lastMessageUpdate);
    await updateDoc(doc(db, "userChats", data.user.uid), lastMessageUpdate);

    setText("");
    setImgFile(null);
  };

  // Ant Design Upload component custom configuration
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



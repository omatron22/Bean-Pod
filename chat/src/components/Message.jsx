// import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { Card, Avatar, Typography } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

// const { Text } = Typography;

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   const isOwner = message.senderId === currentUser.uid;
//   const senderPhotoURL = isOwner ? currentUser.photoURL : data.user.photoURL;

//   return (
//     <div ref={ref} className={`message ${isOwner && "owner"}`}>
//       <Card style={{ width: 300, marginTop: 16 }}>
//         <Card.Meta
//           avatar={<Avatar src={senderPhotoURL || <UserOutlined />} />}
//           title={<Text type="secondary">{message.text}</Text>}
//         />
//         {message.img && <img src={message.img} alt="" style={{ marginTop: 10 }} />}
//       </Card>
//     </div>
//   );
// };

// export default Message;

import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser.uid;
  const senderPhotoURL = isOwner ? currentUser.photoURL : data.user.photoURL;

  return (
    <div ref={ref} className={`message ${isOwner ? "owner" : ""}`}>
      <Card style={{ width: 300, marginTop: 16, alignSelf: isOwner ? 'flex-end' : 'flex-start' }}>
        <Card.Meta
          avatar={<Avatar src={senderPhotoURL || UserOutlined} />}
          title={<Text type="secondary">{message.text}</Text>}
        />
        {message.img && (
          <img 
            src={message.img} 
            alt="" 
            style={{ 
              maxWidth: '600px', 
              maxHeight: '100%', 
              objectFit: 'contain', 
              marginTop: 10 
            }} 
          />
        )}
      </Card>
    </div>
  );
};

export default Message;


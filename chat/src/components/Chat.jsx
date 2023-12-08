import React, { useContext } from "react";
import Add from "../img/add.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;

// import React, { useContext } from "react";
// import { Card, Typography, Avatar, Space } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import Messages from "./Messages";
// import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";
// import Add from "../img/add.svg"; // Make sure this icon is compatible or use an Ant Design icon

// const { Title } = Typography;

// const Chat = () => {
//   const { data } = useContext(ChatContext);

//   return (
//     <Card className="chat">
//       <Card.Header
//         title={<Title level={4}>{data.user?.displayName || "Select a chat"}</Title>}
//         avatar={
//           data.user ? <Avatar src={data.user.photoURL} /> : <Avatar icon={<UserOutlined />} />
//         }
//         extra={
//           <Space>
//             <Avatar src={Add} alt="" shape="circle" />
//             {/* Add more icons or buttons here if needed */}
//           </Space>
//         }
//       />
//       <Messages />
//       <Input />
//     </Card>
//   );
// };

// export default Chat;

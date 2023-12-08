// import React, { useContext } from "react";
// import Add from "../img/add.svg";
// import Messages from "./Messages";
// import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";

// const Chat = () => {
//   const { data } = useContext(ChatContext);

//   return (
//     <div className="chat">
//       <div className="chatInfo">
//         <span>{data.user?.displayName}</span>
//         <div className="chatIcons">
//           <img src={Add} alt="" />
//         </div>
//       </div>
//       <Messages />
//       <Input/>
//     </div>
//   );
// };

// export default Chat;

import React, { useContext } from "react";
import { Card, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import Add from "../img/add.svg"; // Ensure this icon is compatible

const { Title } = Typography;

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <Card className="chat">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          {<Avatar src={data.user.photoURL} />}
          <Title level={4}>{data.user?.displayName || "Select a chat"}</Title>
          {/* Add more icons or buttons here if needed */}
        </Space>
        <Messages />
        <Input />
      </Space>
    </Card>
  );
};

export default Chat;

import React, { useContext } from "react";
import { Card, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import Add from "../img/add.svg"; // Ensure this icon is compatible

const { Title } = Typography;

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <Card className="chat">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          
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

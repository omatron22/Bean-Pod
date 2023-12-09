import React, { useContext } from 'react';
import { Layout, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../firebase';
import { signInWithCustomToken } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { Header } = Layout;

  return (
    <Header style={{ 
      display: 'flex', 
      color: 'black',
      background: 'white',
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0px'
    }}>
      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={currentUser.photoURL || <UserOutlined />} style={{ marginRight: 10 }} />
          {currentUser.displayName}
        </div>
      )}
      <div>
        <Button type="primary" onClick={logout} style={{ marginRight: 10 }}>Logout</Button>
      </div>
    </Header>
  );
};

export default Navbar;




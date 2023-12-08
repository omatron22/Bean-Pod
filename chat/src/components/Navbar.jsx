// import React, { useContext } from 'react';
// import Logo from '../img/BeanPod_Logo.svg'; // Your imported logo
// import { logout } from '../firebase';
// import { AuthContext } from '../context/AuthContext';
// import { Layout, Avatar, Menu, Button } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

// const Navbar = () => {
//   const { currentUser } = useContext(AuthContext);
//   const { Header } = Layout;

//   return (
//     <Header style={{ 
//       display: 'flex: 1', 
//       alignItems: 'center', 
//       backgroundColor: '#ffffff',
//       justifyContent: 'space-between', // Ensures the logo and menu are on opposite sides
//       padding: '0 30px' // Adjust the horizontal padding as needed
//     }}>
//       {currentUser && (
//         <Menu mode="horizontal" style={{ flex: 1, justifyContent: 'end' }}>
//           <Menu.Item key="user" icon={<Avatar src={currentUser.photoURL || <UserOutlined />} />}>
//             {currentUser.displayName}
//           </Menu.Item>
//           <Menu.Item key="logout">
//             <Button type="primary" onClick={logout}>Logout</Button>
//           </Menu.Item>
//         </Menu>
//       )}
//     </Header>
//   );
// };

// export default Navbar;

import React, { useContext } from 'react';
import { Layout, Avatar, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../firebase';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { Header } = Layout;

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      padding: '0px'
    }}>
      {currentUser && (
        <Menu mode="horizontal" style={{ flex: 1, justifyContent: 'end', lineHeight: '64px' }}>
          <Menu.Item key="user" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={currentUser.photoURL || <UserOutlined />} style={{ marginRight: 10 }} />
            {currentUser.displayName}
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="primary" onClick={logout}>Logout</Button>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
};

export default Navbar;



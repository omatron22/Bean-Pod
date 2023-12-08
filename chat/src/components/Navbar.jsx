import React, { useContext } from 'react';
import Logo from '../img/BeanPod_Logo.svg';
import { logout } from '../firebase';
import { AuthContext } from '../context/AuthContext'
import { Layout, Avatar, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)
  const { Header } = Layout;

//   return (
//     <div className='navbar'>
//       {currentUser && (
//         <div className="user">
//           <form>
//             <img src={currentUser.photoURL} alt={currentUser.displayName}/>
//             <span>{currentUser.displayName}</span>
//           </form> 
//           <form>
//             <button onClick={logout}>Logout</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;

return (
  <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
    <div>
      {/* Logo or title */}
    </div>
    {currentUser && (
      <Menu mode="horizontal">
        <Menu.Item key="user" icon={<Avatar src={currentUser.photoURL || <UserOutlined />} />}>
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

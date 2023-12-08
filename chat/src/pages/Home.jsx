// import React from 'react';
// import Chat from '../components/Chat';
// import Sidebar from '../components/Sidebar';


// export const Home = () => {
//   return (
//     <div className = 'home'>
//         <div className = 'container'>
//             <Sidebar/>
//             <Chat/>
//         </div>
//     </div>
//   )
// }

// export default Home

import React from 'react';
import { Layout } from 'antd';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

export const Home = () => {
  return (
    <Layout className='home'>
      <Sider width={300} className="sidebar">
        <Sidebar />
      </Sider>
      <Layout>
        <Content className="chatContent">
          <Chat />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;


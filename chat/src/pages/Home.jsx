import React from 'react'
//import Chats from '../components/Chats'
import Chat from '../components/Chat'
// import Navbar from '../components/Navbar'
// import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
// import Input from '../components/Input'
// import Messages from '../components/Messages'


export const Home = () => {
  return (
    <div className = 'home'>
      <div className = 'container'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home

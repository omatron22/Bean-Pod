import React from 'react'
import Add from '../img/add.svg'
import More from '../img/more.svg'

const Chat = () => {
  
    return (
      <div className="chat">
        <div className="chatInfo">
          <span>Jane</span>
          <div className="chatIcons">
            <img src={Add} alt="" />
            <img src={More} alt="" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Chat;
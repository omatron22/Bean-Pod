import React from 'react'

const Chat = () => {
  
    return (
      <div className="chat">
        <div className="chatInfo">
          <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
          </div>
        </div>
        <Messages />
        <Input/>
      </div>
    );
  };
  
  export default Chat;
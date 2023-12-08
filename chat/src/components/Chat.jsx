// import React from 'react'
// import Add from '../img/add.svg'
// import More from '../img/more.svg'
// import Messages from './Messages'
// import Input from './Input'

// const Chat = () => {
  
//   return (
//     <div className="chat">
//       <div className="chatInfo">
//         <span>Jane</span>
//         <div className="chatIcons">
//           <img src={Add} alt="" />
//           <img src={More} alt="" />
//         </div>
//       </div>
//       <Messages/>
//       <Input/>
//     </div>
//   );
// };
  
//   export default Chat;

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
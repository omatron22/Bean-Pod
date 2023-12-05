import React from 'react'

export const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>hello</p>
         <img src="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
      </div>
    </div>
  )
}


export default Message
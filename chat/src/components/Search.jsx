import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type = "text" />
      </div>
      <div className = "userChat">
        <img src = "https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
        <div className = "userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
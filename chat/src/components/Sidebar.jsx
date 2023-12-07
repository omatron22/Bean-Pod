import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

export const Sidebar = () => {
  return (
    <div className = "sidebar">
      <form>
        <Search/>
        <form>
          <Chats/>
        </form>
      </form>
      <Navbar/>
    </div>

  );
};

export default Sidebar;

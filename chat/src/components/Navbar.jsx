import React, { useContext } from 'react';
import Logo from '../img/BeanPod_Logo.svg';
import { logout } from '../firebase';
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      {currentUser && (
        <div className="user">
          <form>
            <img src={currentUser.photoURL} alt={currentUser.displayName}/>
            <span>{currentUser.displayName}</span>
          </form> 
          <form>
            <button onClick={logout}>Logout</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Navbar;

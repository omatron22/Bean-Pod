// import React from 'react'
// import Logo from '../img/BeanPod_Logo.svg'
// //import src from '../img/Group2.svg'

// const Navbar = () => {
//     return (
//         <div className='navbar'>
//           <form>
//             <img src={Logo} alt='React Image'/>
//             <div className = "name">BeanPod</div>
//           </form>
//           <div className="user">
//             <img src="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
//             <span>John</span>
//             <button>logout</button>
//           </div>
//         </div>
//       )
//     }

// export default Navbar


// import React from 'react';
// import Logo from '../img/BeanPod_Logo.svg';
// import { logout } from '../firebase'; // Import the logout function

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       <form>
//         <img src={Logo} alt='React Image'/>
//         <div className="name">BeanPod</div>
//       </form>
//       <div className="user">
//         <img src="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
//         <span>John</span>
//         <button onClick={logout}>Logout</button> {/* Add onClick event to call logout */}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from 'react';
import Logo from '../img/BeanPod_Logo.svg';
import { logout, auth } from '../firebase'; // Make sure to import auth
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe; // Clean up the subscription
  }, []);

  return (
    <div className='navbar'>
      <form>
        <img src={Logo} alt='React Image'/>
        <div className="name">BeanPod</div>
      </form>
      {user && (
        <div className="user">
          <img src={user.photoURL} alt={user.displayName}/>
          <span>{user.displayName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;

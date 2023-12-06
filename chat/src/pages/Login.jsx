// import React from 'react'
// //import Logo from '../img/beanpodlogo.png'

// const Login = () => {
//   return (
//     <div className='formContainer'>
//         <div className='formWrapper'>
//             <span className="logo">Bean Pod</span>
//             <form>
//                 <input type='email' placeholder='email'/>
//                 <input type='password' placeholder='password'/>
//                 <button>Sign in</button>
//             </form>
//             <p>Don't have an account yet? Register</p>
//         </div>
//     </div>
//   )
// }

// export default Login;

import React from 'react';
import { signInWithGoogle } from '../firebase';

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">Bean Pod</span>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            {/* Remove other form elements related to email/password login if not needed */}
        </div>
    </div>
  )
}

export default Login;

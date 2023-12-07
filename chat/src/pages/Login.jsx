import React from 'react';
import { signInWithGoogle } from '../firebase';
import Logo from '/src/img/BeanPod_Logo.svg'; // Importing the beanpod logo
import googleIcon from '/src/img/google-icon.png'; // Importing Google icon
import beanpod from '/src/img/beanpod.png'; // Importing the beanpod image

const Login = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Login Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={Logo} alt="Logo" style={{ marginBottom: '20px' }} />
        <div className='formContainer'>
          {/* <div className='formWrapper'> */}
            <button className="googleSignIn" onClick={signInWithGoogle}>
              <img src={googleIcon} alt="Google" /> Sign in with Google
            </button>
          {/* </div> */}
        </div>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, backgroundImage: `url(${beanpod})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* This div will show the image */}
      </div>
    </div>
  );
};

export default Login;

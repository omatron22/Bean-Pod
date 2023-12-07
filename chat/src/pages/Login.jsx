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
        {/* Wrapper for logo with increased marginTop */}
        <div style={{ marginTop: '275px' }}> {/* Increase this value to lower the logo more */}
          <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </div>
        
        {/* Google Sign In Button */}
        <div className='formContainer' style={{ marginTop: '-200px' }}>
          <button className="googleSignIn" onClick={signInWithGoogle}>
            <img src={googleIcon} alt="Google" /> Sign in with Google
          </button>
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

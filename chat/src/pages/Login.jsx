import React from 'react';
import { signInWithGoogle } from '../firebase';
import Logo from '/src/img/BeanPod_Logo.svg'; // Importing the beanpod logo
import TitleImage from '/src/img/title.png'; // Importing the title image
import googleIcon from '/src/img/google-icon.png'; // Importing Google icon
import beanpod from '/src/img/beanpod.png'; // Importing the beanpod image

const Login = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Login Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Title Image with adjusted size and position */}
        <div style={{ marginTop: '175px' }}> {/* Decrease this value to move the image higher */}
          <img src={TitleImage} alt="Title" style={{ width: '325px', height: 'auto' }} /> {/* Increase width for a bigger image */}
        </div>

        {/* Beanpod Logo */}
        <div style={{ marginTop: '40px' }}>
          <img src={Logo} alt="Beanpod Logo" style={{ width: '150px', height: 'auto' }} />
        </div>
        
        {/* Google Sign In Button */}
        <div className='formContainer' style={{ marginTop: '-180px' }}>
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

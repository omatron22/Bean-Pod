import React from 'react'
import Logo from '../img/BeanPod_Logo.svg'

export const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <img src={Logo} alt='React Image'/>
            <span className="logo">Bean Pod</span>
            <form>
                <input type='text' placeholder='display name'/>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>
                <button>Sign up</button>
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
  )
}

export default Register;
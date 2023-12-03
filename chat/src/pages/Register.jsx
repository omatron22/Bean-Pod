import React from 'react'
import Logo from '../img/BeanPod_Logo.svg'

export const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <img src={Logo} alt='React Image'/>
            <form>
                <form>
                <input type='text' placeholder='display name'/>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>
                </form> 
            <button>Sign up</button> 
            </form>
            <button>Already have an account?</button>
        </div>
    </div>
  )
}

export default Register;
import React from 'react'
//import Logo from '../img/beanpodlogo.png'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">Bean Pod</span>
            <form>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>
                <button>Sign in</button>
            </form>
            <p>Don't have an account yet? Register</p>
        </div>
    </div>
  )
}

export default Login;
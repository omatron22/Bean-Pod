import React from 'react'
import Logo from '../img/BeanPod_Logo.svg'
//import src from '../img/Group2.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
          <form>
            <img src={Logo} alt='React Image'/>
            <div className = "name">BeanPod</div>
          </form>
          <div className="user">
            <img src="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
            <span>John</span>
            <button>logout</button>
          </div>
        </div>
      )
    }

export default Navbar
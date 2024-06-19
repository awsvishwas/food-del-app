import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <h2>Order your <br/>favorite food here!</h2>
            <p>
            Craving something delicious? Our top-rated delivery service brings your favorite meals 
            from the best local restaurants right to your doorstep.
             Enjoy hot, fresh dishes without leaving home. Order now for the ultimate dining convenience!
            </p>
            <button className='view-menu'> View Menu</button>
        </div>
      
    </div>
  )
}

export default Header

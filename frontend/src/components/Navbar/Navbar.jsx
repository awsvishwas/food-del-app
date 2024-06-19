import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {

  const {getSubTotal,cartItems,token,setToken} = useContext(StoreContext)

  const [menu,setMenu] = useState('home')

  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("token")
    setToken('')
    navigate('/')
  }
  return (
    <div className='navbar'>
      <Link to={'/'}><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link  to='/' onClick={()=>setMenu('home')} className={`${menu==='home'?'active':''}`} >home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={`${menu==='menu'?'active':''}`}>menu</a>
        <a href='#footer' onClick={()=>setMenu('mobile-app')} className={`${menu==='mobile-app'?'active':''}`}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu('contact us')} className={`${menu==='contact us'?'active':''}`}>contact us</a>

        </ul>
      <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
         <Link to={'/cart'}><img src={assets.basket_icon} alt="" onClick={()=>setMenu('cart')} className={`${menu==='cart'?'active':''}`}/></Link>
          <div className={getSubTotal()===0?'':'dot'}>{Object.keys(cartItems).length>0 && Object.keys(cartItems).length}</div>
          </div>
        {!token?
        <button className='navbar-btn' onClick={()=>setShowLogin(true)}>sign in</button>
        :
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>           
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
        }
      </div>
      
    </div>
  )
}

export default Navbar

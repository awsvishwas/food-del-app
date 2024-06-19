import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState]=useState('Sign up')

    const {url,setToken} = useContext(StoreContext)
    

    const [data, setData] = useState({
      name:'',password:'',email:''
    })

    const onChangeHandler =(event)=>{
      const name = event.target.name
      const value = event.target.value 

      setData({...data,[name]:value})
    }

    const onLogin = async (event)=>{
      event.preventDefault()
      let newUrl = url
      if(currState==='Login'){
        newUrl+= "/api/user/login"      }
      else{
        newUrl+= "/api/user/register"
      }

      const response = await axios.post(newUrl, data)

      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }
  return (
    <div className='login'>
        <form className='login-container' onSubmit={onLogin}>
        <div className="login-header">
        <h2>{currState}</h2>
        <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)}/>
      </div>

      <div className='login-inputs'>
        {currState==='Sign up'?<input name='name' type="text" placeholder='Name' onChange={onChangeHandler} value={data.name}/>:<></>}
        <input type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={data.email}/>
        <input type="password" placeholder='Password' name='password' onChange={onChangeHandler} value={data.password}/>
        <button className='login-button' type='submit'>{currState==='Sign up'?'Sign Up':'Login'}</button>
      </div>
      <div className="login-condition">
        <input type="checkbox" required />
        <p>I agree to terms of service and privacy policy.</p>
      </div>
      {
        currState==='Sign up'?
        <>
        <p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login</span></p>
        </>
        :
        <>
        <p>New user? Create account <span onClick={()=>setCurrState('Sign up')}>Click here.</span></p>
        </>
      }
      
      
        </form>
    </div>
  )
}

export default LoginPopup

import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getSubTotal,token,food_list,cartItems,url} =useContext(StoreContext)
  const [data,setData]=useState({
    firstName:'',lastName:'',street:'',city:'',state:'',zipcode:'',contact:'',email:''
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value 
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
    event.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }

    })

    let orderData = {
      address: data,items:orderItems,
      amount: getSubTotal()+20}

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    console.log(response.data)
    if(response.data.success){
      const {session_url} = response.data
      window.location.replace(session_url)    
    }
    else{
      alert('Error!')
    }

  }

  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getSubTotal()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='order'>
      <div className='order-left'>
      <p className='title'>Delivery Information</p>
      <div className="multi-fields">
      <input type="text" placeholder='first name' name='firstName' onChange={onChangeHandler}  value={data.firstName} required/>
      <input type="text" placeholder='last name' name='lastName' onChange={onChangeHandler} value={data.lastName} required/>
      </div>

      <div className="multi-fields">
      <input type="text" placeholder='email' name='email' onChange={onChangeHandler} value={data.email} required/>
      <input type="text" placeholder='contact number' name='contact' onChange={onChangeHandler} value={data.contact} required/>
      </div>
      <input type="text" placeholder='street' name='street' onChange={onChangeHandler} value={data.street} required/>
      <div className="multi-fields">
      
      <input type="text" placeholder='city' name='city' onChange={onChangeHandler} value={data.city} required/>
      <input type="text" placeholder='state' name='state' onChange={onChangeHandler} value={data.state} required/>
      <input type="text" placeholder='zip code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} required/>
      </div>
      </div>
      <div className='order-right'>
      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details"> 
                <p>Subtotal</p><p>{getSubTotal()}</p>
              </div>
              <hr />
              <div className="cart-total-details"><p>Delivery Charge</p><p>{getSubTotal()>0 && 20}</p>
              </div>
              <hr />
              <div className="cart-total-details"><p>Total</p><p>{getSubTotal()>0 && getSubTotal()+20}</p> </div>
             
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>

    </form>
    
  )
}

export default PlaceOrder

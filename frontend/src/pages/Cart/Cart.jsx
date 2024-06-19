import React, { useContext, useEffect, useState} from 'react'
import './Cart.css'
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const navigate = useNavigate()
  const {cartItems, food_list, removeFromCart, addToCart,getSubTotal,url} = useContext(StoreContext)
 
  return (
    <div className='cart' id='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add / Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
              return (
                <>
                <div className='cart-items-title cart-items-item'>
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                <div className='add-remove'>
                <button onClick={()=>addToCart(item._id)}>Add</button> 
                <button onClick={()=>removeFromCart(item._id)}>Remove</button></div>
              </div>
              <hr />
              {

              }
              </>
              )
            }
          })
        }
        <div className="cart-bottom">
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
              <div className="cart-total-details"><p>Total</p><p>{getSubTotal() && getSubTotal()+20}</p> </div>
             
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          
        
        <div className='cart-promocode'>
            <p>Enter Promo code here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

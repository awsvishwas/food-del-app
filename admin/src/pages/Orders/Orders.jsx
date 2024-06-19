import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import './Orders.css'
import axios from "axios"
import { assets } from '../../assets/admin_assets/assets'
const Order = ({url}) => {

  const [orders,setOrders] = useState([])

  const fetchAllOrders = async()=>{
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success){
      setOrders(response.data.data)
    }
    else{
      toast.error("Error!")
    }

  }

  const statusHandler = async(event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>
      
          (
          <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt="" />
          <div>
          <p className='order-item-food-list'>
            {order.items.map((item,index)=>{
              return <p><b>{item.name+": "+item.quantity}</b></p>
            })}
          </p>
          <p className='order-item-name'><b>{order.address.firstName+ " "+ order.address.lastName}</b></p>
          <p className='order-item-address'>
            <p>{order.address.street+", "+ order.address.city+", " +order.address.state}</p>
            <p>{order.address.zipcode}</p>
          </p>
          <p>{order.address.contact}</p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>&#8377;{order.amount}</p>
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
            <option value="Under Process">Under Process</option>
            <option value="Out For Delivery">Out For Devlivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
          )

        )}
      </div>
      
    </div>
  )
}

export default Order

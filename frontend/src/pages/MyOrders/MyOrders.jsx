import React, { useContext, useEffect,useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios'

const MyOrders = () => {

    const [data,setData] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null);
    const {url,token} = useContext(StoreContext)

    const fetchOrder = async() =>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data);
    }

    const fetchOrderById = async (orderId) => {
        try {
            const response = await axios.get(`${url}/api/order/${orderId}`, { headers: { token } });
            const updatedOrder = response.data.data;
            setSelectedOrder(updatedOrder);
            updateOrderInState(updatedOrder);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };
    
    const updateOrderInState = (updatedOrder) => {
        setData(prevData => prevData.map(order => 
            order._id === updatedOrder._id ? updatedOrder : order
        ));
    };

    useEffect(()=>{
        if(token){
            fetchOrder()
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
            {data.map((order,index)=>{
               return ( <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                        return item.name+" "+item.quantity
                    
                })}</p>
                <p>	&#8377;{order.amount}</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={() => fetchOrderById(order._id)}>Track Order</button>
            </div>)
            })}
        </div>
      
    </div>
  )
}

export default MyOrders

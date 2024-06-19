import React,{ createContext, useEffect, useState} from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState({})
    const url = 'http://localhost:4000'
    const [token,setToken] = useState('')
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
        }
    }

    const getSubTotal = () =>{
        let newSubTotal = 0
        food_list.forEach(item=>{
            if (cartItems[item._id] > 0) {
                newSubTotal += item.price * cartItems[item._id];   
        }
    })
    return newSubTotal
    }

    const fetchFoodList = async() =>{
        const response = await axios.get(url+'/api/food/list')
        setFoodList(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }

        loadData()

    },[])

    const contextValue={token, setToken, url ,food_list,cartItems,setCartItems,addToCart,removeFromCart,getSubTotal}

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider
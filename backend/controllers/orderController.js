import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import stripe from "stripe"

const stripeVariable = new stripe(process.env.STRIPE_SECRET)
const frontend_url = 'http://localhost:5174'
const placeOrder = async(req,res)=>{
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
                price_data:{
                    currency: 'inr',
                    product_data:{
                        name: item.name
                    },
                    unit_amount:item.price*100
                },
                quantity: item.quantity

        }))

        line_items.push({price_data:{currency:'inr',product_data:{name:'Delivery Charges'},unit_amount:20*100},quantity:1})

        const session = await stripeVariable.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})
    }
    catch(error){
        res.json({success:false, message:"Error!"})
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body
    try{
        console.log(req.body)
        if(success=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            
            res.json({success:true,message:"Payment Successful!"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Payment Cancelled!"})
        }
    }
    catch(error){
        res.json({success:false,message:'Error!'})
    }
}

const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
    }
    catch(error){
        res.json({success:false,message:'Error!'})
    }
}

const listAllOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({success:true, data:orders})
    }catch(error){
        res.json({success:false, message:"Error!"})
    }
}

const updateOrderStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:'Status Updated'})
    }
    catch(error){
        res.json({success:false, message:'Error!'})
    }

}

const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found!' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error!' });
    }
};
export {placeOrder,verifyOrder,userOrders,listAllOrders,updateOrderStatus,getOrderById}
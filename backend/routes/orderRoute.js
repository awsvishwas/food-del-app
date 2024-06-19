import express from "express"
import { placeOrder, verifyOrder,userOrders, listAllOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router()

orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleware,userOrders)
orderRouter.get('/list',listAllOrders)
orderRouter.post('/status',updateOrderStatus)
orderRouter.get('/:id', authMiddleware, getOrderById);


export default orderRouter
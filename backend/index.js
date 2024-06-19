import express from "express"
import cors from "cors"
import { dbConnector } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import 'dotenv/config.js'
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
dbConnector()

//routes
app.use('/api/food', foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req, res)=>{
    res.send("Hello world!")
})

app.listen(port, ()=>{
    console.log(`localhost running on port ${port}`)
})

// mongodb+srv://admin:admin123@cluster0.cmrlrma.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0
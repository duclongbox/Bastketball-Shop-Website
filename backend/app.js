require('dotenv').config()
const express=require('express')
var cookieParser = require('cookie-parser')
const app=express()
// replace the try-catch in routes
require('express-async-errors');
const {notFound,errorHandler}=require('./middleware/error')
const connectDB=require('./database/db')
const nikeRoutes=require('./routes/product/nike')
const payRouters=require('./routes/payment/payment')
const userRoute=require('./routes/user/users')
// middleware
app.use(express.json())
app.use(cookieParser())
// routes
app.use('/api/v1',nikeRoutes)
app.use('/api/v1/payment',payRouters)
app.use('/api/v1/logIn',userRoute)
// incorrect routes
app.use(notFound)
app.use(errorHandler)


const port=process.env.PORT||3000
const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is listening port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

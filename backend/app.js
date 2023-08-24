require('dotenv').config()
const express=require('express')
const app=express()
// replace the try-catch in routes
require('express-async-errors');
const {notFound,errorHandler}=require('./middleware/error')
const connectDB=require('./database/db')
const nikeRoutes=require('./routes/product/nike')
// middleware
app.use(express.json())

// routes
app.use('/api/v1/nike',nikeRoutes)

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

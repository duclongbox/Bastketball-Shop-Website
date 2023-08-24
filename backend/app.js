require('dotenv').config()
const express=require('express')
const app=express()
const {notFound,errorHandler}=require('./middleware/error')
const connectDB=require('./database/db')
// middleware
app.use(express.json())

// routes


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

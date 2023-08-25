// get the key
require('dotenv').config({path:'../.env'})

// connect to DB
const connectDB=require('../database/db')

// get the testing data
const testingData=require('./data.json')

// get the schema
const shoeSchema=require('../models/schema')

console.log(process.env.MONGO_URL);
const start=async()=>{
    try {
        // connect the DB
        await connectDB(process.env.MONGO_URL)
        // delete the original data
        await shoeSchema.deleteMany()
        // upload the shoe
        await shoeSchema.create(testingData)
        console.log('success')
    } catch (error) {
        console.log(error);
        
    }
}

start()
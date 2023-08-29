const payment=require('../models/paySchema')

const createOrder=async (req,res)=>{
    const order=await payment.create(req.body)
    console.log(order);
    res.json(order);
}

const getOrderByID=async (req,res)=>{
    const {id}=req.params

}

module.exports={createOrder,getOrderByID}
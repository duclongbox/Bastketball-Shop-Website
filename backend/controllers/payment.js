const payment=require('../models/paySchema')
const shoes=require('../models/schema')

// get the price automatically from shoe database
const createOrder=async (req,res)=>{
    const body=req.body
    const {shoeName,size}=body
    const shoe = await shoes.findOne({ name: shoeName, size: size })
    body.price=shoe.price
    const order=await payment.create(body)
    res.status(200).json(order);
}

// get all the order in a user
// or the specific order under that user
const getOrderByID=async (req,res)=>{
    const {userID}=req.params
    const {orderID}=req.query
    let query={userID:userID}
    let selectOrder
    if (orderID !== undefined && orderID !== null) {
        query.orderID=orderID
        selectOrder=await payment.find(query).select('address phone email shoeName size')  
    }
      else {      
        selectOrder=await payment.find(query).select('address phone email shoeName size')
    }
    res.status(200).json({selectOrder})
}

const deleteOrderByID=async (req,res)=>{
    const {userID}=req.params
    const {orderID}=req.query
    await payment.deleteOne({userID:userID,orderID:orderID})
    res.status(200).json({success:'Success to delete the order'})
}

const updateOrderByID=async (req,res)=>{
    const {userID}=req.params
    const {orderID}=req.query
    const updateInfo=req.body
    let update={}
    if (!updateInfo) {
        res.status(400).json({fail:'Fail to submit update info'})
    }
    for (const key in updateInfo) {
        if (key==='address'||key==='email'||key==='phone') {
            update[key] = updateInfo[key];
        }
    }
    const updateOrder=await payment.findOneAndUpdate(
        {userID,orderID},
        {$set:update},
        {new:true}
    )   
    res.status(200).json({ updateOrder });
}

module.exports={createOrder,getOrderByID,deleteOrderByID,updateOrderByID}
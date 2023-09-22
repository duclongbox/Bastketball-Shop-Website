const express=require('express')
const router=express.Router()
const {createOrder,getOrderByID,deleteOrderByID,updateOrderByID}=require('../../controllers/payment')

router.post('/',createOrder)
router.get('/:userID',getOrderByID)
router.delete('/:userID',deleteOrderByID)
router.put('/:userID',updateOrderByID)

module.exports=router
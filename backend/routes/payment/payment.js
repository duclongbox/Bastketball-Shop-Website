const express=require('express')
const router=express.Router()
const {createOrder,getOrderByID}=require('../../controllers/payment')

router.post('/',createOrder)
router.get('/:id',getOrderByID)

module.exports=router
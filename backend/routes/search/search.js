const express=require('express')
const router=express.Router()
const {getShoeData}=require('../../controllers/search')

router.post('/',getShoeData)

module.exports=router;
const express=require('express')
const router=express.Router()
const {verifyToken}=require("../../middleware/verifyToken")
const {getAllproducts,getProductsByName,getProductInCart}=require('../../controllers/products')


router.get('/brand/:brand', getAllproducts);
router.get('/name/:name',getProductsByName)
router.get('/cart/:id',getProductInCart)



module.exports=router
const express=require('express')
const router=express.Router()
const {verifyToken}=require("../../middleware/verifyToken")
const {getAllproducts,getProductsByName,getProductInCart,getRelateProduct}=require('../../controllers/products')


router.get('/brand/:brand', getAllproducts);
router.get('/name/:shoeName',getProductsByName)
router.get('/cart/:id',getProductInCart)
router.get('/relate/:name',getRelateProduct)



module.exports=router
const express=require('express')
const router=express.Router()
const {getAllproducts,getProductsByName}=require('../../controllers/products')

router.get('/:brand/:page', getAllproducts);
router.get('/:brand',getProductsByName)


module.exports=router
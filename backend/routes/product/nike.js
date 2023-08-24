const express=require('express')
const router=express.Router()
const {getAllproducts,getProductsByID}=require('../../controllers/products')

router.get('/', getAllproducts);
router.get('/:id',getProductsByID)


module.exports=router
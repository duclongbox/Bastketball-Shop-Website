const express=require('express')
const router=express.Router()
const {getAllNikeproducts,getProductsByName}=require('../../controllers/products')

router.get('/', getAllNikeproducts);
router.get('/:id',getProductsByName)


module.exports=router
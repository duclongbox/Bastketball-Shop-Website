const express=require('express')
const router=express.Router()
const {getAllproducts,getProductsByName,}=require('../../controllers/products')

router.get('/:brand', getAllproducts);
router.get('/:brand',getProductsByName)

// router.get('/numPage/:brand', getNumOfPage)

module.exports=router
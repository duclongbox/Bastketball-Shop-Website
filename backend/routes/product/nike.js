const express=require('express')
const router=express.Router()
const {getAllproducts,getProductsByName,}=require('../../controllers/products')

router.get('/brand/:brand', getAllproducts);
router.get('/name/:name',getProductsByName)

// router.get('/numPage/:brand', getNumOfPage)

module.exports=router
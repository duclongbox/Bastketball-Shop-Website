const shoes=require('../models/schema')

// get all the nike shoe based on the page
const getAllNikeproducts=async (req,res)=>{
   const {page}=req.query
   // limit each page contain 10 shoes 
   const pagePerItem=10
   const skipItems=(page-1)*pagePerItem
   const nikeShoes=await shoes.find({brand:'nike'})
   .skip(skipItems)
   .limit(pagePerItem)
   res.status(200).json({nikeShoes})
}

// get the specific nike shoe by the 
const getProductsByName=async (req,res)=>{
    
     res.json(`The id is ${req.params.id}`)
 }




module.exports={getAllNikeproducts,getProductsByName}
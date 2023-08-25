const shoes=require('../models/schema')


const getAllNikeproducts=async (req,res)=>{
   const nikeShoes=await shoes.find({brand:'nike'})
   res.status(200).json({nikeShoes})
}

const getProductsByName=async (req,res)=>{
    
     res.json(`The id is ${req.params.id}`)
 }




module.exports={getAllNikeproducts,getProductsByName}
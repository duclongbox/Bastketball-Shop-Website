const getAllproducts=async (req,res)=>{

   await res.send('testing get all products')
}

const getProductsByID=async (req,res)=>{
    
     res.json(`The id is ${req.params.id}`)
 }




module.exports={getAllproducts,getProductsByID}
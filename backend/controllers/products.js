const shoes = require("../models/schema");

// get all the nike shoe based on the page
// eg http://localhost:3000/api/v1/brand/nike
const getAllproducts = async (req, res) => {
  const { brand } = req.params;
  const allShoes = await shoes
    .find({ brand: brand })
    .select("id brand name imageURL");
 return res.status(200).json(allShoes);
};

// get the specific nike shoe by the name
// eg: http://localhost:3000/api/v1/name/nike1
const getProductsByName = async (req, res) => {
  const { shoeName } = req.params;
  const { size } = req.query;
  console.log("debug");
  let query = { name: shoeName };
  let selectShoe;
  query.size = size;
  selectShoe = await shoes.find(query).select("_id brand name sizes imageURL");
  return res.status(200).json(selectShoe[0]);
}

const getRelateProduct=async(req,res)=>{
  let {name}=req.params
  name=name.split("-")[0]
  const searchItem=/^nike1-/i
  const selectShoe=await shoes.find({name:{$regex:searchItem}}).select("name imageURL")
  return res.status(200).json(selectShoe)
}

const getProductInCart=async(req,res)=>{
  const {id}=req.params
  const {index}=req.query
  let selectShoe=await shoes.findOne({_id:id}).select("brand imageURL sizes name")
  selectShoe.sizes=selectShoe.sizes[index]
  res.status(200).json(selectShoe)
}


module.exports = { getAllproducts, getProductsByName,getProductInCart,getRelateProduct };

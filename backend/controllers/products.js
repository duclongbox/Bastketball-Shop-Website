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
  const { name } = req.params;
  const { size } = req.query;
  let query = { name: name };
  let selectShoe;
  query.size = size;
  selectShoe = await shoes.find(query).select("_id brand name sizes imageURL");
  return res.status(200).json(selectShoe[0]);
};

const getProductInCart=async(req,res)=>{
  const {id}=req.params
  const {index}=req.query
  let selectShoe=await shoes.findOne({_id:id}).select("brand imageURL sizes name")
  selectShoe.sizes=selectShoe.sizes[index]
  res.status(200).json(selectShoe)
}

module.exports = { getAllproducts, getProductsByName,getProductInCart };

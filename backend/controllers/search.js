const shoes = require("../models/schema");

const getShoeData = async (req, res) => {
  // get the data from body
  let  { searchTerm } = req.body;
  searchTerm=searchTerm.toLowerCase()
  const result=await shoes.find({$or:[{name:{$regex:searchTerm}},{brand:{$regex:searchTerm}},{category:{$regex:searchTerm}}]}).select("brand name imageURL")
  res.status(200).json({
    success: true,
    result: result,
  });
}

module.exports = { getShoeData };
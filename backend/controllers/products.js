const shoes = require("../models/schema");

// get all the nike shoe based on the page
// eg http://localhost:3000/api/v1/brand/nike
const getAllproducts = async (req, res) => {
  const { brand } = req.params;
  const page = parseInt(req.query.page);
  // get the page number for this brand
  if (page === 0) {
    const allShoes = await shoes
      .find({ brand: brand })
      .select("id brand name imageURL");
    res.status(200).json(allShoes);
  } else {
    const pagePerItem = 10;
    const skipItems = (page - 1) * pagePerItem;
    const shoesPerPage = await shoes
      .find({ brand: brand })
      .select("brand name")
      .skip(skipItems)
      .limit(pagePerItem);
    res.status(200).json({ shoesPerPage });
  }
};

// get the specific nike shoe by the name
// eg: http://localhost:3000/api/v1/name/nike1
const getProductsByName = async (req, res) => {
  const { name } = req.params;
  const { size } = req.query;
  let query = { name: name };
  let selectShoe;
  query.size = size;
  selectShoe = await shoes.find(query).select("_id brand name size imageURL");
  res.status(200).json( selectShoe[0] );
};

module.exports = { getAllproducts, getProductsByName };

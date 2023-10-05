const users = require("../models/user");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  const body = req.body;
  let { userID, password } = body;
  // check if the database contain this userID
  if (await users.findOne({ userID: userID })) {
    res.status(409).json({ success: false });
  } else {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(`get some error ${err}`);
      } else {
        await users.create({ userID: userID, password: hash });
        res.status(200).json({ userID: userID, password: hash });
      }
    });
  }
};

const getUser=async(req,res)=>{
    
}

module.exports = { createUser };

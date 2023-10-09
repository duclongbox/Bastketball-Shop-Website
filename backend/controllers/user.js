require('dotenv').config({path:'../.env'})
const users = require("../models/user");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const secretKey=process.env.SECRET_KEY

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
        res.send(err)
        console.log(`get some error ${err}`);
      } else {
        await users.create({ userID: userID, password: hash });
        res.status(200).json({ success: true  });
      }
    });
  }
};

// get a specific user info
const getUser=async(req,res)=>{
    const body=req.body
    const {userID,password}=body;
    let hash
    if (hash=await users.findOne({userID: userID}).select("password")) {
      hash=hash.password
      bcrypt.compare(password, hash, function(err, result) {
        if (err) {
          res.send(`Have some error ${err}`)
        }
        else if (result) {
          const token=jwt.sign({userID},secretKey,{expiresIn:'1h'})
          res.cookie('token',token,{ expires: new Date(Date.now() + 3600000),httpOnly: true})
          res.status(200).json({success:true})
        }
        else{
          res.status(401).json({success:false})
        }
    });
     
    }
    else{
      res.status(404).json({success:false})
    }
}

module.exports = { createUser,getUser };

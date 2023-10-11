require('dotenv').config({path:'../.env'})
const users = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const secretKey=process.env.SECRET_KEY

const createUser = async (req, res) => {
  const body = req.body;
  let { userID, password } = body;
  // check if the database contain this userID
  if (await users.findOne({ userID: userID })) {
    return res.status(409).json({ success: false });
  } else {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        res.send(err)
        console.log(`get some error ${err}`);
      } else {
        await users.create({ userID: userID, password: hash });
        return res.status(200).json({ success: true  });
      }
    });
  }
};

// get a specific user info
const getUserByLogIn=async(req,res)=>{
    const body=req.body
    const {userID,password}=body;
    let hash
    if (hash=await users.findOne({userID: userID}).select("password")) {
      hash=hash.password
      bcrypt.compare(password, hash, function(err, result) {
        if (err) {
         return  res.send(`Have some error ${err}`)
        }
        else if (result) {
          const token=jwt.sign({userID},secretKey,{expiresIn:'1h'})
          res.cookie('token',token,{ expires: new Date(Date.now() + 3600000),httpOnly: true})
          return res.status(200).json({success:true})
        }
        else{
         return res.status(401).json({success:false})
        }
    });
     
    }
    else{
      return res.status(404).json({success:false})
    }
}

const getUserByToken =async(req,res)=> {
  const userID=req.userID;
  const userInfo=await users.findOne({userID:userID}).select("userID")
  return res.status(200).json({success:true,userInfo});
}

const logOut=async(req,res)=>{
  return res.status(200).clearCookie('token').json({message:"successfully log out"})
}

const addShoeToCart=async (req,res)=>{
  // get shoe info from req
  const userID=req.userID
  const body=req.body
  const newItem={
    shoeID:body.shoeID,
    index:body.index
  }
  const updateInfo=await users.findOneAndUpdate(
    {userID:userID},
    { $push: { addedItem: newItem } },
    { new: true }
  )
  return res.status(200).json({ success: true, message: "Shoe added to cart", user: updateInfo});
}

const getCart=async (req,res)=>{
  // get user info
  const userID=req.userID
  if (userID) {
    const foundUser=await users.findOne({userID:userID}).select("userID addedItem favorItem")
    res.status(200).json(foundUser)
  }
  else{
    res.status(404).json({success:false,message:"Unable to find this user"})
  }
  
  
}

module.exports = { createUser,getUserByLogIn,getUserByToken,logOut,addShoeToCart,getCart };

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
  const userInfo=await users.findOne({userID:userID}).select("userID name shoeSize email")
  return res.status(200).json({success:true,userInfo});
}

const logOut=async(req,res)=>{
  return res.status(200).clearCookie('token').json({message:"successfully log out"})
}

const addShoeToCart=async (req,res)=>{
  // get shoe info from req
  const userID=req.userID
  const body=req.body
  if (body.shoeID) {
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
  else{
    const shoeID=body.likeShoeID
    const pindex=body.likeIndex
    const newItem={
      shoeID:shoeID,
      index:pindex
    }
    const user=await users.findOne({userID:userID}).select("favorItem")
    let flag=false;
    // check if the favor item contain the new item
    for (let index = 0; index < user.favorItem.length; index++) {
      if (user.favorItem[index].shoeID===shoeID&&user.favorItem[index].index===pindex) {
        flag=true
        break
      }
    }

    if (flag) {
      return res.status(409).json({success:false,message:"You are following this shoe"})
    }
    else{
      console.log(newItem);
      console.log(userID);
      await users.findOneAndUpdate(
        {userID:userID},
        { $push: { favorItem: newItem } },
        { new: true }
      )
      return res.status(200).json({success:true,message:"Successfully follow this item"})
    }
  }
  
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


const deleteHistory=async(req,res)=>{
  const userID=req.userID
  const index=req.body.index
  // delete buy history
  if (req.body.history) {
    const deleteUser=await users.findOne({userID:userID}).select("addedItem")
    await users.findOneAndUpdate(
      {userID:userID},
      {$pull:{addedItem:deleteUser.addedItem[index]}},
      { new: true }
    )
  }
  else{
    const deleteUser=await users.findOne({userID:userID}).select("favorItem")
    await users.findOneAndUpdate(
      {userID:userID},
      {$pull:{favorItem:deleteUser.favorItem[index]}},
      { new: true }
    )
  }
}

const editProfile=async(req,res)=>{
  const userID=req.userID
  const body=req.body
  const editUser=await users.findOne({userID:userID}).select("name shoeSize email")
  await users.findOneAndUpdate(
    {userID:userID},
    {name:body.name,shoeSize:body.shoeSize,email:body.email},
    { new: true }
  )
  res.json({success:true})
}

const deleteAccount=async(req,res)=>{
  const userID=req.userID
  await users.findOneAndDelete({userID:userID})
  res.json({success:true})
}


module.exports = { createUser,getUserByLogIn,getUserByToken,logOut,addShoeToCart,getCart,deleteHistory,editProfile, deleteAccount};

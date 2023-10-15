const express=require('express')
const router=express.Router()
const {verifyToken}=require("../../middleware/verifyToken")
const {createUser,getUserByLogIn,getUserByToken,logOut,addShoeToCart,getCart,deleteHistory}=require('../../controllers/user')

router.post('/signUp',createUser)
router.post('/logIn',getUserByLogIn)
router.get('/token',verifyToken,getUserByToken)
router.get('/logOut',logOut)
router.post('/addCart',verifyToken,addShoeToCart)
router.get('/getCart',verifyToken,getCart)
router.delete('/deleteH',verifyToken,deleteHistory)


module.exports=router;
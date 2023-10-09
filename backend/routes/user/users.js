const express=require('express')
const router=express.Router()
const {verifyToken}=require("../../middleware/verifyToken")
const {createUser,getUserByLogIn,getUserByToken,logOut}=require('../../controllers/user')

router.post('/signUp',createUser)
router.post('/logIn',getUserByLogIn)
router.get('/token',verifyToken,getUserByToken)
router.get('/logOut',logOut)
module.exports=router;
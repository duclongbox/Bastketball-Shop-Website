const express=require('express')
const router=express.Router()

const {createUser,getUser}=require('../../controllers/user')

router.post('/signUp',createUser)
router.post('/logIn',getUser)
module.exports=router;
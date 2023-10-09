const express=require('express')
const router=express.Router()

const {createUser,getUserByLogIn,getUserByToken}=require('../../controllers/user')

router.post('/signUp',createUser)
router.post('/logIn',getUserByLogIn)
router.get('/token',getUserByToken)
module.exports=router;
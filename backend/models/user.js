const mongoose=require('mongoose')

const userSchema =new mongoose.Schema({
    userID:{type:String,required:true},
    password:{type:String,require:true}
})

module.exports=mongoose.model('user',userSchema)
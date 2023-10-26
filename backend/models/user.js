const mongoose=require('mongoose')

const addItemSchema=new mongoose.Schema({
    shoeID:{type:String,required:true},
    index:{type:Number,required:true}
})

const favorItemSchema=new mongoose.Schema({ 
    shoeID:{type:String,required:true},
    index:{type:Number,required:true}
}) 

const userSchema =new mongoose.Schema({
    userID:{type:String,required:true},
    password:{type:String,require:true},
    name:{type:String},
    shoeSize:{type:String},
    email:{type:String},
    addedItem:[addItemSchema],
    favorItem:[favorItemSchema]
})

module.exports=mongoose.model('user',userSchema)
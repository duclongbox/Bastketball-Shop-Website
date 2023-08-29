const mongoose=require('mongoose')

const paySchema=new mongoose.Schema({
    address:{
        type:String,
        require:[true,"must provide a address"]
    },
    phone:{
        type:String,
        require:[true,"must provide a phone number"]
    },
    email:{
        type:String,
        require:[true,"must provide a email"]
    },
    productID:{
        type:String,
        
    }

})

module.exports=mongoose.model('payment',paySchema)
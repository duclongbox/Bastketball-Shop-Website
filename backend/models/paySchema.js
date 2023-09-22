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
    shoeName:{
        type:String,
        require:[true,"must provide a shoe name"]
    },
    size:{
        type:Number,
        require:[true,"must provide a shoe size"]
    },
    userID:{
        type:String,
        require:[true,"must provide a user ID"]
    },
    orderID:{
        type:String,
        require:[true,"must provide a order ID"]
    },
    price:{
        type:Number,
        default:0
    }


})

module.exports=mongoose.model('payment',paySchema)
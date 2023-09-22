const mongoose=require('mongoose')

const size=["38","39","40","41","42","43","44","45"]

const shoeSchema=new mongoose.Schema({
    brand:{
        type:String,
        required:[true,'must provide a brand'],
        enum:['nike','adidas','jordan']
    },
    name:{
        type:String,
        required:[true,'must provide a brand']
    },
    size:{
        type:Number
    },
    price:{
        type:Number
    }

    
})

module.exports=mongoose.model('shoe',shoeSchema)
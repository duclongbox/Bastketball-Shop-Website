const mongoose=require('mongoose')

const sizePriceSchema = new mongoose.Schema({
    size: { type: Number, required: true },
    price: { type: Number, required: true }
  });

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
    sizes: [sizePriceSchema],
    imageURL:{
        type:String,
        require:[true,'need a image to show the shoes']
    }
})

module.exports=mongoose.model('shoe',shoeSchema)
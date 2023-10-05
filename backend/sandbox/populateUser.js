require('dotenv').config({path:'../.env'})
const connectDB=require('../database/db')
const testingData=require('./user.json')
const shoeSchema=require('../models/user')
console.log(process.env.MONGO_URL);

// hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;
console.log( testingData.length);

userID="abc123"


    bcrypt.hash("12345", saltRounds, function(err, hash) {
       console.log(hash);
    });
    






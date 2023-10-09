const jwt = require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY

const verifyToken=((req,res,next)=>{
    const token=req.cookies.token
    if (!token) {
        return res.status(401).json({success:false,message:"cannot find token"})
    }
    jwt.verify(token,secretKey,(err,decoded)=>{
        if (err) {
            return res.status(401).json({success:false,message:"Unauthorized"})
        }
        req.userID=decoded.userID
        next();
    })
})

module.exports={verifyToken}
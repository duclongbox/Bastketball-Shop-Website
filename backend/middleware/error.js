const notFound = (req, res) => res.status(404).send('Route does not exist')

const errorHandler=(err,req,res,next)=>{
    return res.status(500).json('something break')
}
module.exports={notFound,errorHandler}
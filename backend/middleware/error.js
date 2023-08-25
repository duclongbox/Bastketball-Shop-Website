const notFound = (req, res) => res.status(404).send('Route does not exist')

const errorHandler=(err,req,res,next)=>{
    console.log(err);
    return res.status(500).json(err)
}
module.exports={notFound,errorHandler}
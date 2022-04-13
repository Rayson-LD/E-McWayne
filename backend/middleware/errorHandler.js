const notFound =(req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    req.status(404)
    next(error)
}

const errors = (err,req,res,next) =>{
    const statusCode = req.statusCode === 200 ? 500 : req.statusCode
    res.json(statusCode)
    res.json({
        message:err.message
    })
}
export {notFound,errors}
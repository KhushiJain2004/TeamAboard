const globalErrorHandling=(err,req,res,next)=>{
    return res.json({
        success:false,
        message:err.message
    })
}
const logRequest=(req,res,next)=>{
    console.log('Request received at : ',new Date());
    next();
}

export {globalErrorHandling,logRequest};
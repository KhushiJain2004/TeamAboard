const globalErrorHandling=(err,req,res,next)=>{
    return res.json({
        success:false,
        status:err.status,
        message:err.message
    })
}

export {globalErrorHandling};
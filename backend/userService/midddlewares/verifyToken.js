import jwt from 'jsonwebtoken'

export const verifyToken= (req,res,next)=>
{
    const token=req.cookies.token;
    
    jwt.verify(token,process.env.SECRET_KEY,async(err,payload)=>
    {
        if(err) return res.status(401).json({success:"false",message:"Token not valid, login again"});
        req.userId=payload.id;
        next();
    })
}
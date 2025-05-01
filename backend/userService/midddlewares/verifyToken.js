import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey=fs.readFileSync('./keys/public.pem');

export const verifyToken= (req,res,next)=>
{
    const token=req.cookies.token;
    if(!token) return res.json({success:false,message:"token not found"})
    // console.log(token)
    
    jwt.verify(token,publicKey,{algorithms:['RS256']},async(err,payload)=>
    {
        if(err) return res.status(401).json({success:false,message:"Token not valid, login again"});
        req.userId=payload.id;
        next();
    })
}
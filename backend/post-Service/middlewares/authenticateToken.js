import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey=fs.readFileSync('./keys/public.pem');

export const authenticateToken= (req,res,next)=>
{
    // console.log("hi")
    const token=req.cookies.token;
    
    jwt.verify(token,publicKey,{algorithms:['RS256']},async(err,payload)=>
    {
        if(err) {
            // console.log(err.message)
            return res.status(401).json({success:"false",message:"Token not valid, login again"});
        }
        // console.log(payload);
        req.userId=payload.id;
        next();
    })
}
import jwt from 'jsonwebtoken'
import fs from 'fs';

const publicKey=fs.readFileSync('./keys/public.pem');

export const verifyToken= (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.status(404).json({success:false,message:"Token not found"});

    jwt.verify(token,publicKey,{algorithms:['RS256']},async (err,payload)=>{
        if(err){
            return res.status(401).json({success:false,message:"Token invalid...Login again!"});
        }
        req.userId=payload.id;
        next();
    })
}
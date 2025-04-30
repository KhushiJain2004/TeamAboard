import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import fs from 'fs';

const secret=fs.readFileSync('./keys/private.pem');
const createToken=(id)=>
{
    return jwt.sign({
        id,
        isAdmin:false,
    },secret,{expiresIn:'3d',algorithm:'RS256'});
}

export const register=async (req,res)=>
{
    const {email,password,...rest} = req.body;
    // console.log(name);
    const salt =await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(password,salt);
    
    const user = new userModel({
        email,
        password:hash,
        ...rest
    });
    
    try {
        
        const exists=await userModel.findOne({email});
        if(exists) return res.json({success:false,message:'email already registered'});

        const newUser=user.save();
        if(newUser)
        {
            // const token=createToken(newUser._id);
            return res.json({success:true,message:'registered'});
        }
    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

// export const register=async (req,res)=>
// {
//     const {email,password} = req.body;
//     // console.log(name);
//     const salt =await bcrypt.genSalt(10);
//     const hash =await bcrypt.hash(password,salt);
    
//     const user = new userModel({
//         email,
//         password:hash,
//     });
    
//     try {
        
//         const exists=await userModel.findOne({email});
//         if(exists) return res.json({success:false,message:'email already registered'});

//         const newUser=user.save();
//         if(newUser)
//         {
//             // const token=createToken(newUser._id);
//             return res.json({success:true,message:'registered'});
//         }
//     } catch (error) {
//         res.json({success:false,message:error.message});
//     }

// }

export const login=async (req,res)=>
{
    const {email,password} =req.body;
    try {
        const user = await userModel.findOne({email});
        
        if(user)
        {
            const matchPassword=await bcrypt.compare(password,user.password);
            if(matchPassword) 
            {
                const token = createToken(user._id);
                const userObject = user.toObject();
                const {password:userPassword,...userInfo}=userObject;
                console.log(token);
                res.cookie("token",token,{
                    httpOnly:true ,
                    // secure:true,
                    maxAge:1000*60*60*24*3
                }).
                status(200).json(userInfo);
            }
            else res.json({success:false,message:'incorrect password'});
        }
        else res.json({success:false,message:'user not found , please register'});
    } catch (error) {
        res.json({success:false,message:error.message});
    } 
}

export const logout=(req,res)=>
{
    res.clearCookie("token").status(200).json({message:'Logged out successfully'});

}
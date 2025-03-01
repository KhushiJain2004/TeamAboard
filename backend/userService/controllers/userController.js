import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const getAllUsers=async(req,res)=>
{
    try {
        const users=await userModel.find();
        res.json({success:true,users});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get users'});
    }
}
export const getUser=async (req,res)=>
{
    const id=req.userId;
    // console.log(id);
    try {
        const user = await userModel.findOne({_id:id}).select('-password');
        if(!user) return res.status(500).json({message:'User Not found!'});
        res.status(200).json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}
// export const getUserPost=async (req,res)=>
//     {
//         const id=req.userId;
//         // console.log(id);
//         try {
//             const user=await userModel.findOne({_id:id}).select('-password');
//             const posts = await postModel.find({authorId:id})
//             .populate('postDetail')
//             .populate('authorId', 'name avatar email')
//             .exec();
//             res.status(200).json({success:true,user,posts});
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({message:'failed to get userPosts'});
//         }
//     }
export const updateUser=async (req,res)=>
{
    const id=req.params.id;
    const userId=req.userId;
    const {password,avatar,...data}=req.body;

    if(userId!==id)
    {
        return res.status(403).json({message:"Not authorised"});
    }
    let newPassword=null;
    try {
        if(password)
        {
            newPassword=await bcrypt.hash(password,10);
        }
        const updated  = await userModel.findOneAndUpdate({_id:id},{
            ...data,
            ...(newPassword && {password:newPassword}),
            ...(avatar && {avatar})
        },
        { new: true }

        );
        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(updated);
        const plainUser = updated.toObject();
        const { password: userPassword, ...userInfo } = plainUser;
        // console.log(userInfo);
        res.json(updated);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const deleteUser=async (req,res)=>
{
    const id=req.params.id;
    const userId=req.userId;
    try {
        const user=await userModel.findByIdAndDelete(id);
        if(userId!==id)
        {
            return res.status(403).json({message:"Not authorised"});
        }
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        res.clearCookie("token");
        res.status(200).json({message:" user deleted and cookie cleared"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import axios from 'axios'

export const getAllUsers=async(req,res)=>
{
    try {
        const users=await userModel.find();
        res.json({success:true,totalUsers:users.length,users});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get users'});
    }
}
export const findUserWithId=async (req,res)=>
{
    const id=req.params.userId;
    console.log(id);
    try {
        const user = await userModel.findOne({_id:id}).select('name email bio');
        if(!user) return res.status(500).json({message:'User Not found!'});
        res.status(200).json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}
export const getUser=async (req,res)=>
{
    const id=req.userId;
    // console.log(id);
    try {
        const user = await userModel.findOne({_id:id}).select('-password');
        if(!user) return res.status(500).json({success:false,message:'User Not found!'});
        res.status(200).json({success:true,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'failed to get user'});
    }
}

export const getUserProfileWithPosts=async (req,res)=>
    {
        const id=req.userId;
        // console.log(id);
        try {
            const user = await userModel.findOne({_id:id}).select('-password');
            if(!user) return res.status(500).json({message:'User Not found!'});
            const posts=await axios.get('http://localhost:4000/api/posts/user',{withCredentials:true});
            res.status(200).json({
                success:true,
                user,
                noOfPosts:posts.rowCount,
                posts:posts.rows[0]});
        } catch (error) {
            // console.log(error);
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    }
    

// export const updateUser=async (req,res)=>
// {
//     const id=req.params.id;
//     const userId=req.userId;
//     const {password,avatar,role,gender,codingLevel,availability,...data}=req.body;

//     if(userId!==id)
//     {
//         return res.status(403).json({message:"Not authorised"});
//     }
//     let newPassword=null;
//     try {
//         if(password)
//         {
//             newPassword=await bcrypt.hash(password,10);
//         }
//         const updated  = await userModel.findOneAndUpdate({_id:id},{
//             ...data,
//             ...(newPassword && {password:newPassword}),
//             ...(avatar && {avatar})
//         },
//         { new: true }

//         );
//         if (!updated) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         // console.log(updated);
//         const plainUser = updated.toObject();
//         const { password: userPassword, ...userInfo } = plainUser;
//         // console.log(userInfo);
//         res.json(updated);
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:error.message});
//     }
// }

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;
    const { password, avatar, role, gender, codingLevel, availability, education, ...data } = req.body;

    if (userId !== id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    try {
        let newPassword = null;
        if (password) {
            newPassword = await bcrypt.hash(password, 10);
        }

        // Enum validation for all fields
        const allowedRoles = ["Student", "Mentor", "Other"];
        const allowedGenders = ["Male", "Female", "Other"];
        const allowedCodingLevels = ["beginner", "intermediate", "advanced"];
        const allowedAvailability = ["openToJoin", "NotAvailaible"];
        const allowedDegreeTypes = ["Bachelors", "Masters", "PhD", "High School"];

        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }
        if (gender && !allowedGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender specified" });
        }
        if (codingLevel && !allowedCodingLevels.includes(codingLevel)) {
            return res.status(400).json({ message: "Invalid coding level specified" });
        }
        if (availability && !allowedAvailability.includes(availability)) {
            return res.status(400).json({ message: "Invalid availability status specified" });
        }
        
        if (education && Array.isArray(education)) {
            for (const edu of education) {
                if (edu.degreeType && !allowedDegreeTypes.includes(edu.degreeType)) {
                    return res.status(400).json({ message: `Invalid degreeType: ${edu.degreeType}` });
                }
            }
        }

        const updated = await userModel.findOneAndUpdate(
            { _id: id },
            {
                ...data,
                ...(newPassword && { password: newPassword }),
                ...(avatar && { avatar }),
                ...(role && { role }),
                ...(gender && { gender }),
                ...(codingLevel && { codingLevel }),
                ...(availability && { availability }),
                ...(education && { education }),
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        const plainUser = updated.toObject();
        const { password: userPassword, ...userInfo } = plainUser;

        res.json(userInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


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

export const userInterests=async (req,res)=>{
    const userId=req.params.id
    try {
        const user=await userModel.findById(userId).select('interests');
        console.log(user)
        return res.json({interests:user.interests});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
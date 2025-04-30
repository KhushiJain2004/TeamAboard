import pool from "../config/db.js";
import axios from 'axios'

export const showInterestInPost=async (req,res,next)=>{
    const userId=req.userId;
    const postId=req.params.id;
    const authorId=req.authorId;
    try {
        if(!userId) return res.json({success:false,message:'no user id given'});
        if(userId===authorId) return res.json({success:false,message:'cannot apply to your own post'});
        
        const findUser=await pool.query("SELECT status from interested_users WHERE user_id=$1 and post_id=$2 ",[userId,postId]);
        if(findUser.rowCount!=0) return res.json({success:false,message:'This user has already applied to this post ... ',statusOfApplication:findUser.rows[0].status});
        
        const result=await pool.query("INSERT INTO interested_users (post_id,user_id) VALUES ($1,$2) RETURNING * ",[postId,userId]);
        return res.status(200).json({success:true,message:"successfully stored",result:result.rows[0]})

    } catch (error) {
        next(error);
    }
}
export const viewInterestedUsers=async (req,res,next)=>{
    const userId=req.userId;
    const postId=req.params.id;
    try {
        if(!userId) return res.json({success:false,message:'no user id given'});

        const post=await pool.query("SELECT created_by FROM posts WHERE id=$1",[postId]);
        if(userId!=post.rows[0].created_by) return res.json({success:false,message:'user can view application on their own posts only'});

        const result=await pool.query("SELECT user_Id,status FROM interested_users WHERE post_id=$1",[postId]);

        let users=[];
        for (const user of result.rows) {
            const res = await axios.get(`http://localhost:5000/api/user/${user.user_id}`);
            res.data.user.status=user.status;
            users.push(res.data.user);
        }
        return res.json({success:true,totalUsers:result.rowCount,users})
    } catch (error) {
        next(error);
    }
}
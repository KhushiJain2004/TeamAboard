import pool from "../config/db.js";

export const getAllPosts= async(req,res,next)=>{
    try {
        const posts=await pool.query("SELECT * FROM posts");
        return res.json({
            success:true,
            noOfPosts:posts.rowCount,
            allPosts:posts.rows
        })
        
    } catch (error) {
        next(error);
    }
}
export const getPost= async(req,res,next)=>{
    try {
        const postId=req.params.id;
        // console.log(postId)

        const result=await pool.query("SELECT * FROM posts WHERE id=$1",[postId]);

        return res.status(200).json({
            success:true,
            post:result.rows[0]
        })
        
    } catch (error) {
        next(error)
    }
}
export const getUsersPost= async(req,res,next)=>{
    const userId=req.userId;
    // console.log(userId)
    try {
        const posts=await pool.query('SELECT * FROM posts WHERE created_by=$1',[userId]);
        return res.status(200).json({
            success:true,
            noOfPosts:posts.rowCount,
            posts:posts.rows
        })
    } catch (error) {
        next(error)
    }
}
export const createPost= async(req,res,next)=>{
    const userId=req.userId;
    const {tittle,description,category=null,skills=[],location=null,time}=req.body;
    try {

        if (!userId || !tittle || !description) {
            return res.status(400).json({
                success: false,
                message: "userId, tittle, and description are required.",
            });
        }
        const post=await pool.query(
            "INSERT INTO posts (created_by,tittle,description,category,requiredSkills,location,time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",[userId,tittle,description,category,skills,location,time]);

        return res.status(200).json({
            success:true,
            post:post.rows[0]
        })

    } catch (error) {
        next(error)
    }
}
export const deletePost= async(req,res,next)=>{
    const id=req.params.id;
    const userId=req.userId;
    try {
        const post=await pool.query("SELECT * FROM posts WHERE id=$1",[id]);
        if (post.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        if(post.rows[0].created_by!==userId) return res.status(401).json({
            success:false,
            message:'unauthorised to delete this post'
        })
        const result=await pool.query("DELETE FROM posts WHERE id=$1",[id]);

        return res.status(200).json({
            success:true,
            message:'Post deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const updatePost=async (req,res,next)=>{
    const postId=req.params.id;
    const userId=req.userId;
    try {
        var {tittle,description,category,skills,location,time}=req.body;

        skills=skills?.length!=0 ? skills:null;

        const post=await pool.query("SELECT * FROM posts WHERE id=$1",[postId]);
        if (post.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        if(post.rows[0].created_by!==userId) return res.status(401).json({
            success:false,
            message:'unauthorised to update this post'
        })
        const result=await pool.query(
            "UPDATE posts SET tittle=COALESCE($1,tittle),description=COALESCE($2,description),category=COALESCE($3,category),requiredSkills=COALESCE($4,requiredSkills),location=COALESCE($5,location),time=COALESCE($6,time) WHERE id=$7 RETURNING *",[tittle,description,category,skills,location,time,postId] 
        )

        return res.json({
            success:true,
            updatedPost:result.rows[0]
        })

        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const filterPosts=async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
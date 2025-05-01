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
    const {tittle,description,skills=[],location=null,deadline}=req.body;
    try {

        if (!userId || !tittle || !description) {
            return res.status(400).json({
                success: false,
                message: "userId, tittle, and description are required.",
            });
        }
        const post=await pool.query(
            "INSERT INTO posts (created_by,tittle,description,requiredSkills,location,deadline) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[userId,tittle,description,skills,location,deadline]);

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

import axios from "axios";

export const filterPosts = async (req, res, next) => {
  const { skills, purpose, tags, location, teamSize, tittle, deadline, uploadDate } = req.query;
  const userId = req.userId;

  try {
    const filters = [];
    const values = [];
    let index = 1;

    if (skills) {
      filters.push(`skills && $${index++}::text[]`);
      values.push(skills.split(','));
    }
    if (purpose) {
      filters.push(`purpose ILIKE $${index++}`);
      values.push(`%${purpose}%`);
    }
    if (tags) {
      filters.push(`tags && $${index++}::text[]`);
      values.push(tags.split(','));
    }
    if (location) {
      filters.push(`location ILIKE $${index++}`);
      values.push(`%${location}%`);
    }
    if (teamSize) {
      filters.push(`team_size = $${index++}`);
      values.push(parseInt(teamSize));
    }
    if (tittle) {
      filters.push(`title ILIKE $${index++}`);
      values.push(`%${tittle}%`);
    }
    if (deadline) {
      filters.push(`deadline <= $${index++}`);
      values.push(deadline);
    }
    if (uploadDate) {
      filters.push(`upload_date >= $${index++}`);
      values.push(uploadDate);
    }

    if (filters.length > 0) {

      const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
      const filteredQuery = `SELECT * FROM posts ${whereClause} ORDER BY createdAt DESC`;

      const { rows } = await pool.query(filteredQuery, values);
      return res.json({ posts: rows });
    } else {
      // No filters → get user interests
      const response = await axios.get(`http://localhost:5000/api/user/interests/${userId}`);
      const userInterests = response.data.interests || [];
      console.log(response.data)

      // Match posts where tags, skills or purpose matches interests
      const interestQuery = `
        SELECT *, 1 AS priority
        FROM posts
        WHERE tags && $1::text[] OR requiredSkills && $1::text[] OR purpose ILIKE ANY (
          SELECT '%' || unnest($1::text[]) || '%'
        )
        UNION
        SELECT *, 2 AS priority
        FROM posts
        WHERE id NOT IN (
          SELECT id FROM posts
          WHERE tags && $1::text[] OR requiredSkills && $1::text[] OR purpose ILIKE ANY (
            SELECT '%' || unnest($1::text[]) || '%'
          )
        )
        ORDER BY priority, createdAt DESC
      `;

      const { rows } = await pool.query(interestQuery, [userInterests]);
      return res.json({ posts: rows });
    }
  } catch (error) {
    next(error);
  }
};

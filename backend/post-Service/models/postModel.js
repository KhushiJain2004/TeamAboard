import pool from "../config/db.js";

export const createPostTable=async ()=>{

    const postQuery=`create table if not exists posts(
    id SERIAL PRIMARY KEY,
    created_by TEXT NOT NULL ,
    tittle TEXT NOT NULL ,
    description TEXT NOT NULL,
    category TEXT,
    requiredSkills TEXT[],
    location TEXT,
    time TEXT DEFAULT '',
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
    )`;

    const interestedUsersTableQuery=`CREATE TABLE IF NOT EXISTS interested_users (
        id SERIAL PRIMARY KEY,
        post_id INT REFERENCES posts(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL,
        status TEXT CHECK (status IN ('Pending', 'Accepted', 'Rejected')) DEFAULT 'Pending',
        applied_at TIMESTAMP DEFAULT NOW()
    )`;

    try {
        await pool.query(postQuery);
        await pool.query(interestedUsersTableQuery);
        console.log("tables created if not exists");
      } catch (error) {
        console.log("Error creating users table : ", error);
      }

}


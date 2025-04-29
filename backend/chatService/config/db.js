import mongoose from "mongoose";

export const dbConnect=async ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connected to chats db"))
    .catch(err=>{
        console.log(err.message)
        process.exit(1)
    })

}
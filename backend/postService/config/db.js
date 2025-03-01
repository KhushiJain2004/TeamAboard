import mongoose from "mongoose"

const connectToDb=async ()=>
{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to post-service db");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectToDb;
import mongoose from "mongoose";

const schema= mongoose.Schema({
    organization: String,
    position: String,
    startDate: Date,
    endDate: Date
},{timestamps:true})

const model=mongoose.model('user-experience',schema)

export default model;


//i dont think we need this 
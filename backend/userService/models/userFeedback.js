import mongoose from "mongoose";

const schema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    rating:{ type: Number, min: 1, max: 5, required: true },
    feedback:{type:String,maxlength: 500}
},{timestamps:true})

const model=mongoose.model('user-feedback',schema);
export default model;
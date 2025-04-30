import mongoose, { Mongoose }  from "mongoose";

const schema=mongoose.Schema({
    isGroupChat:{type:Boolean,default:false},
    groupName:{type:String},
    description:{type:String},
    admin:{type:mongoose.Schema.Types.ObjectId},

    users:[{type:mongoose.Schema.Types.ObjectId}],
    lastMsg:{type:String},
    msgs:[{type:mongoose.Schema.Types.ObjectId}],
    metadata:{
        icon:String,
    }
},{timestamps:true})

const model=mongoose.model("chat",schema)

export default model;
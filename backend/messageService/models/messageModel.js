import mongoose from "mongoose";

const schema=mongoose.Schema({
    chatId:{type:String,required:true},
    text:{type:String, required:true},
    senderId:{type:String,requires:true},
    seenBy:[{type:String}]
},{
    timeStamps:true
})

const model=mongoose.model("messages",schema)

export default model;
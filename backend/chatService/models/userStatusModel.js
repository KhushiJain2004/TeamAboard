import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        userId:String,
        chatId:{type:mongoose.Schema.Types.ObjectId,ref:'chat'},
        isOnline:{type:Boolean,default:false},
        role:{type:String,
            enum:['member','admin']
        },

        lastActive:{type:Date},
        lastMsgRead:{type:mongoose.Schema.Types.ObjectId},
        unreadMsgsCount:{type:Number,default:0},

        joinedAt:Date,

    }
);

const model=mongoose.model("userStatus",schema);
export default model;
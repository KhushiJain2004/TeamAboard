import chatModel from "../models/chatModel.js";

export const sendMsg=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const userId=req.userId;

        const chat=await chatModel.findById(chatId);
        if(!chat) next({message:"Chat not found"});

        if(!chat.users.include(userId)) next({message:"User is not a part of this chat..cannot send msg"});

        const {text}=req.body;

        const msg= new messageModel({
            chatId,
            senderId:userId,
            text
        })
        const savedMsg=await msg.save();

        chat.msgs.push(savedMsg._id);
        chat.lastMsg=text;
        const updatedChat=await chat.save();

        return res.status(200).json({success:false,message:"Message sent ",updatedChat});

    } catch (error) {
        console.log(error.message);
        next({message:error.message})
    }
}
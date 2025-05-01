import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js"; // Make sure this import exists

export const sendMsg = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.userId;

    // console.log(chatId)

    const chat = await chatModel.findById(chatId);
    if (!chat) return next({ message: "Chat not found" });

    if (!chat.users.includes(userId)) {
      return next({ message: "User is not a part of this chat..cannot send msg" });
    }

    const { text } = req.body;

    const msg = new messageModel({
      chatId,
      senderId: userId,
      text,
    });

    const savedMsg = await msg.save();

    chat.msgs.push(savedMsg._id);
    chat.lastMsg = text;

    const updatedChat = await chat.save();

    return res.status(200).json({
      success: true,
      message: "Message sent",
      updatedChat,
    });
  } catch (error) {
    console.log(error.message);
    next({ message: error.message });
  }
};

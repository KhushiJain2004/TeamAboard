import chatModel from '../models/chatModel.js'
import userStatusModel from '../models/userStatusModel.js'
import axios from 'axios';


export const createChat=async(req,res,next)=>{
    try {
        const {isGroupChat,groupName,users,admin,icon,...rest}=req.body;

        const chat=new chatModel({
            isGroupChat,
            groupName,users,admin,
            metadata:{
                icon
            },...rest
        })
        // console.log(req.body)
        if(!users || users.length<2 )  return next({status:400,message:"Atleast 2 members needed to create a chat/group"});
        
        if(isGroupChat){
            if(!groupName || groupName.trim()=="") return next({status:400,message:"Group name not provided"});
            if(users.length<3)  return next({status:400,message:"Atleast 3 members needed to create a group"});

            const groupExists=await chatModel.findOne({groupName});
            if(groupExists!=null) return next({status:403,groupExists,message:"Group with same name already exists"});

            if(!admin)  return next({status:400,message:"admin not provided"});

        }
        else{
            if(users.length>2 )  return next({status:400,message:"Direct chat can be created between max 2 members"});
        }

        const existingDm=await chatModel.findOne({users:{$all:users,$size:users.length}});
        if(existingDm!=null) return res.json({success:true,message:'chat exists',existingDm});

        const savedChat=await chat.save();

        for(const id of users){
            var role="member"
            if(chat.isGroupChat && id===admin )  role="admin"
            const userStatus= new userStatusModel({
                userId:id,
                chatId:chat._id,
                role, 
                joinedAt:new Date()
            })
            await userStatus.save()
        }

        return res.json({success:true,message:'Chat created',chat:savedChat});

    } catch (error) {
        console.log(error.message);
        next({status:500,message:error.message})
    }
}
export const deleteChat=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId
        // console.log(chatId)
        const chat=await chatModel.findById(chatId);

        if(!chat) return res.json({success:false,message:"Chat Not found"});

        for(const id of chat.users){
            const userStatus= await userStatusModel.deleteOne({userId:id,chatId});
        }
        const deleted=await chatModel.findByIdAndDelete(chatId);

        return res.json({success:true,message:'Chat deleted',deleted});
    } catch (error) {
        console.log(error.message);
        next({message:error.message})
    }
}

export const openChatWithId=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const userId=req.userId;

        const chat=await chatModel.findById(chatId);
        if(!chat) return next({status:404,message:"chat with given id does not exist"});

        // console.log(chat._id)
        const completeChat=await getDetailsOfUsersInChat(chat,userId,true)
        return res.json({success:true,chatDetails:completeChat});

    } catch (error) {
        console.log(error.message);
        next({message:error.message})
    }
}
export const getUserChats=async(req,res,next)=>{
    try {
       const userId=req.userId;

       const chats=await chatModel.find({users:{$in:[userId]}}).sort({updatedAt:-1,_id:-1});
    //    console.log(chats)

       const completeChats=[]

       for (const chat of chats){
            const chatObj=chat.toObject();
            const userStatus=await userStatusModel.find({userId,chatId:chat._id});
            chatObj.userStatus=userStatus;
            // console.log(userStatus)

           if(!chat.isGroupChat) {
            const receiverId=chat.users[0]==userId ? chat.users[1] : chat.users[0]
            // console.log(receiverId)
            const res=await axios.get(`http://localhost:5000/api/user/${receiverId}`)
            chatObj.receiver=res.data.user
        }

            completeChats.push(chatObj);
       }
       return res.json({success:true,totalChats:completeChats.length,chats:completeChats})

    } catch (error) {
        console.log(error.message);
        next({status:error.status,message:"Failed to get user chats"})
    }
}
export const getUserChatsOptimized=async(req,res,next)=>{
    try {
        const receiverIds = new Set();

        for (const chat of chats) {
          if (!chat.isGroupChat) {
            const receiverId = chat.users[0] === userId ? chat.users[1] : chat.users[0];
            receiverIds.add(receiverId);
          }
        }
        //one axios request only .. modify endpoint in userService as well 
        let receiverData = {};
        if (receiverIds.size > 0) {
          const idsParam = Array.from(receiverIds).join(',');
          const res = await axios.get(`http://localhost:5000/api/users`, {
            params: { ids: idsParam }
          });
          for (const user of res.data.users) {
            receiverData[user._id] = user;
          }
        }
        for (const chat of chats) {
            const chatObj = chat.toObject();
            const userStatus = await userStatusModel.find({ userId, chatId: chat._id });
            chatObj.userStatus = userStatus;
          
            if (!chat.isGroupChat) {
              const receiverId = chat.users[0] === userId ? chat.users[1] : chat.users[0];
              chatObj.receiver = receiverData[receiverId];
            }
          
            completeChats.push(chatObj);
          }
          

    } catch (error) {
        console.log(error.message);
        next({status:error.status,message:"Failed to get user chats"})
    }
}
export const addMemberToGroupChat=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const userId=req.userId;
        const members=req.body.membersToAdd

        const chat=await chatModel.findById(chatId);
        if(!chat) return res.status(404).json({success:false,message:"chat not found"})
        if(!chat.isGroupChat) return next({message:"cannot add members to direct messages"})
            
            if(chat.admin!=userId) return res.status(401).json({success:false,message:"Only admin is allowed to add/remove members"})
                
                for(const id of members){
                    if(!chat.users.includes(id)){
                        chat.users.push(id)
                        const newMember= new userStatusModel({
                            userId:id,
                            chatId,
                            role:"member",
                            joinedAt:new Date()
                        })
                        await newMember.save()
                    }
                    else{ return res.json({success:false,message:"member already in the group",id})}
                }
                const updatedChat=await chat.save();

                const updatedChatWithDetails=await getDetailsOfUsersInChat(updatedChat,userId,false)
                
                return res.json({success:true,message:"members added",updatedChatWithDetails})
                
                
            } catch (error) {
                console.log(error.message);
            }
        }
export const removeMember=async(req,res,next)=>{
    try {
        const chatId=req.params.chatId;
        const userId=req.userId;
        const members=req.body.membersToRemove
        
        if(!chat.isGroupChat) return next({message:"cannot remove members from direct messages"})
        const chat=await chatModel.findById(chatId);
        if(!chat) return res.status(404).json({success:false,message:"chat not found"})

        if(chat.admin!=userId) return res.status(401).json({success:false,message:"Only admin is allowed to add/remove members"})

        for(const id of members){
           if(chat.users.includes(id)){
            const index=chat.users.indexOf(id)
            chat.users.splice(index,1)      //remove one element at index
            await userStatusModel.deleteOne({userId:id,chatId:chat._id})
           }
           else{ return res.json({success:false,message:"member not found",id})}
        }
        const updatedChat=await chat.save();

        return res.json({success:true,message:"members removed",updatedChat})
    } catch (error) {
        console.log(error.message);
        next({message:error.message})
    }
}

//complete chat details

const getDetailsOfUsersInChat=async (chat,userId,setMsgsAsRead)=>{
    const chatObj=chat.toObject();
    chatObj.receivers=[]
    for(const id of chat.users){
        if(id!=userId) {
            const res=await axios.get(`http://localhost:5000/api/user/${id}`)
            const receiver=res.data.user
            receiver.userStatus=await userStatusModel.findOne({userId:id,chatId:chat._id});
            chatObj.receivers.push(receiver);
        }
        else {
            const status=await userStatusModel.findOne({userId:id,chatId:chat._id});
            if(setMsgsAsRead){
                status.unreadMsgCount=1
                await status.save()
            }
            chatObj.senderStatus=status

        }
    }
    return chatObj

}
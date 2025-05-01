import FriendRequest from "../models/requests";
async function sendFriendRequest(req,res) {
const {senderId,recipientId}=req.body;
try {
    const existingRequest = await FriendRequest.findOne({
    $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
    ]
    });
    
    if (existingRequest) {
    return res.json({ success: false, message: "A friend request already exists between these users" });
    }
    
    const newRequest = new FriendRequest({
    sender: senderId,
    recipient: recipientId,
    });
    
    await newRequest.save();
    return res.json({ success: true, request: newRequest });
} catch (error) {
    console.error("Error sending friend request:", error);
    return res.json({ success: false, message: error.message });
}
}

async function acceptFriendRequest(req,res) {
    const {requestId}=req.params
    const userId=req.userId
try {
    const request = await FriendRequest.findById(requestId);
    
    if (!request) {
    return res.json({ success: false, message: "Friend request not found" });
    }

    if (request.recipient.toString() !== userId.toString()) {
    return res.json({ success: false, message: "Unauthorized" });
    }
    
    request.status = "accepted";
    await request.save();
    
    // Add each user to the other's friends list
    // await User.findByIdAndUpdate(
    // request.sender,
    // { $addToSet: { friends: request.recipient } }
    // );
    
    // await User.findByIdAndUpdate(
    // request.recipient,
    // { $addToSet: { friends: request.sender } }
    // );
    
    return { success: true, request };
} catch (error) {
    console.error("Error accepting friend request:", error);
    return { success: false, message: error.message };
}
}

async function declineFriendRequest(req,res) {
    const {requestId}=req.params
try {
    const request = await FriendRequest.findById(requestId);
    
    if (!request) {
    return res.json({ success: false, message: "Friend request not found" });
    }
    
    if (request.recipient.toString() !== userId.toString()) {
    return res.json({ success: false, message: "Unauthorized" });
    }
    
    request.status = "declined";
    await request.save();
    
    return res.json({ success: true, request });
} catch (error) {
    console.error("Error declining friend request:", error);
    return res.json({ success: false, message: error.message });
}
}

async function getPendingRequests(req,res) {
    const userId=req.userId
try {
    const pendingRequests = await FriendRequest.find({
    recipient: userId,
    status: "pending"
    }).populate('sender', 'name email avatar');
    
    return res.json({ success: true, requests: pendingRequests });
} catch (error) {
    console.error("Error getting pending requests:", error);
    return res.json({ success: false, message: error.message });
}
}

async function getSentRequests(req,res) {
    const userId=req.userId
try {
    const sentRequests = await FriendRequest.find({
    sender: userId
    }).populate('recipient', 'name email avatar');
    
    return res.json({ success: true, requests: sentRequests });
} catch (error) {
    console.error("Error getting sent requests:", error);
    return res.json({ success: false, message: error.message });
}
}

async function checkFriendship(userId1, userId2) {
try {
    const user = await User.findById(userId1);
    return { 
    success: true, 
    areFriends: user.friends.includes(userId2)
    };
} catch (error) {
    console.error("Error checking friendship:", error);
    return { success: false, message: error.message };
}
}

async function getFriendshipStatus(userId1, userId2) {
try {
    // Check if they're already friends
    const user = await User.findById(userId1);
    if (user.friends.includes(userId2)) {
    return { success: true, status: "friends" };
    }
    
    // Check for pending requests
    const request = await FriendRequest.findOne({
    $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 }
    ]
    });
    
    if (!request) {
    return { success: true, status: "none" };
    }
    
    if (request.status === "pending") {
    if (request.sender.toString() === userId1.toString()) {
        return { success: true, status: "request_sent" };
    } else {
        return { success: true, status: "request_received" };
    }
    }
    
    return { success: true, status: request.status };
} catch (error) {
    console.error("Error getting friendship status:", error);
    return { success: false, message: error.message };
}
}
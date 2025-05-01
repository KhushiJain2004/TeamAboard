import { reactive } from 'vue';
import axios from 'axios';
import { userState } from './store';

export const chatState = reactive({
  chats: [],
  messages: [],
  selectedChatId: null,
  selectedChat: null,

  async fetchChats() {
    // if (!userState.user) return;
    try {
      const response = await axios.get('http://localhost:5001/api/chat/', {
        withCredentials: true,
      });
      console.log(response.data.chats) 
      this.chats = response.data.chats;
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  },

  async fetchChat(chatId) {
    try {
      const response = await axios.get(`http://localhost:5001/api/chat/${chatId}`, {
        withCredentials: true,
      });
      console.log(response.data)
      if (response.data.chatDetails) {
        this.messages = response.data.msgs || [];
        this.selectedChatId = chatId;
        this.selectedChat = this.chats.find((chat) => chat._id === chatId) || null;
      }
    } catch (error) {
      console.error('Failed to fetch chat:', error);
    }
  },

  async selectChat(chatId) {
    this.selectedChatId = chatId;
    await this.fetchChat(chatId);
  },
 async sendMessage(text) {
    const res=await axios.post(`http://localhost:5001/api/chat/sendMsg/${this.selectedChatId}`,{
      text
    },{withCredentials:true})
    console.log(res.data)
    // if(res.data.success) this.fetchChat()

  },

  createGroup(newGroup) {
    if (!userState.user) return;
    newGroup.members.push(userState.user._id);
    newGroup._id = `group-${Date.now()}`;
    newGroup.isGroupChat = true;
    newGroup.avatar = 'https://via.placeholder.com/40';
    newGroup.lastMessage = null;
    newGroup.lastMessageTime = null;
    newGroup.msgs = [];
    this.chats.push(newGroup);
  },

  getExistingContacts() {
    return this.chats
      .filter((chat) => !chat.isGroupChat)
      .map((chat) => ({
        id: chat._id,
        name: chat.receiver.name,
        receiverId: chat.receiver._id,
      }));
  },
});

// Initialize chats when user is available
const initializeChats = async () => {
    await chatState.fetchChats();

};

// Watch for user changes to fetch chats
 initializeChats();
<template>
  <div class="chat-container">
    <!-- Sidebar -->
    <chat-sidebar :chats="chats" @select-chat="selectChat" />

    <!-- Chat Window -->
    <chat-window
      v-if="selectedChat"
      :selected-chat="selectedChat"
      :messages="messages"
      :current-user="currentUser"
      @send-message="sendMessage"
    />
    <div v-else class="chat-window-placeholder">
      <p>Select a chat to start messaging</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChatSidebar from '../components/ChatSidebar.vue';
import ChatWindow from '../components/ChatWindow.vue';

export default {
  name: 'ChatView',
  components: { ChatSidebar, ChatWindow },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentUser = 'You'; // Static user for now

    // Mock chat data
    const chats = ref([
      {
        id: 1,
        name: 'Abhay Pawiya',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'We apply krr dheee',
        lastMessageTime: '10:07',
        messages: [
          { id: 1, sender: 'Abhay', text: 'We apply krr dheee', time: '10:07' },
          { id: 2, sender: 'You', text: 'spcm la lab files submit krde', time: '12:27' },
        ],
      },
      {
        id: 2,
        name: 'Community group (B)',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Boba day is calling, You + bubble te...',
        lastMessageTime: '15:47',
        messages: [
          { id: 1, sender: 'You', text: 'spcm la lab files submit krde', time: '14:23' },
          { id: 2, sender: 'Bhai', text: 'Project udyaa', time: '15:16' },
        ],
      },
      {
        id: 3,
        name: 'Bunty',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'spcm la lab files submit krde',
        lastMessageTime: '14:23',
        messages: [
          { id: 1, sender: 'You', text: 'spcm la lab files submit krde', time: '12:27' },
          { id: 2, sender: 'Bunty', text: 'Kr rakhi h', time: '13:55' },
          { id: 3, sender: 'Bunty', text: 'Minor ki presentation kb h?', time: '13:55' },
          { id: 4, sender: 'You', text: 'June?', time: '14:22' },
          { id: 5, sender: 'Bunty', text: 'ya may?', time: '14:22' },
        ],
      },
    ]);

    const messages = ref([]);
    const selectedChat = computed(() => {
      const chatId = parseInt(route.params.id);
      return chats.value.find((chat) => chat.id === chatId) || null;
    });

    watch(
      () => route.params.id,
      (newId) => {
        const chatId = parseInt(newId);
        const chat = chats.value.find((chat) => chat.id === chatId);
        messages.value = chat ? chat.messages : [];
      },
      { immediate: true }
    );

    const selectChat = (chatId) => {
      router.push(`/chat/${chatId}`);
    };

    const sendMessage = (text) => {
      if (text.trim() && selectedChat.value) {
        const newMessage = {
          id: Date.now(),
          sender: currentUser,
          text: text.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        selectedChat.value.messages.push(newMessage);
        messages.value = selectedChat.value.messages;
        selectedChat.value.lastMessage = newMessage.text;
        selectedChat.value.lastMessageTime = newMessage.time;
      }
    };

    return { chats, selectedChat, messages, currentUser, selectChat, sendMessage };
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #1a202c;
  color: #fff;
}
.chat-window-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
.chat-window-placeholder p {
  color: #a0aec0;
  font-size: 1.2rem;
}
</style>

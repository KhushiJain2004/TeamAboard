<template>
  <div class="chat-container">
    <!-- Sidebar -->
    <chat-sidebar :chats="chats" :existing-contacts="existingContacts" @select-chat="selectChat"
      @create-group="handleCreateGroup" />

    <!-- Chat Window -->
    <chat-window v-if="selectedChat" :selected-chat="selectedChat" :messages="messages" :current-user="currentUser"
      @send-message="sendMessage" />
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

// Import avatar images from the assets folder
import avatar1 from '@/assets/images/avatar1.avif';
import avatar2 from '@/assets/images/avatar2.avif';
import avatar3 from '@/assets/images/avatar3.avif';

export default {
  name: 'ChatView',
  components: { ChatSidebar, ChatWindow },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentUser = 'You'; // Static user for now
    const currentUserId = 'user-you'; // Mock ID for the current user

    // Array of imported avatars
    const avatars = [avatar1, avatar2, avatar3];

    // Mock chat data with dynamically assigned avatars
    const chats = ref([
      {
        id: 'chat1',
        name: 'Abhay Pawiya',
        avatar: avatars[0], // Assign avatar1.jpg
        type: 'individual',
        lastMessage: 'We apply krr dheee',
        lastMessageTime: '10:07',
        messages: [
          { id: 1, sender: 'Abhay', text: 'We apply krr dheee', time: '10:07' },
          { id: 2, sender: 'You', text: 'spcm la lab files submit krde', time: '12:27' },
        ],
      },
      {
        id: 'chat2',
        name: 'Community group (B)',
        avatar: avatars[1], // Assign avatar2.jpg
        type: 'group',
        members: ['user-abhay', 'user-bunty', 'user-you'],
        lastMessage: 'Boba day is calling, You + bubble te...',
        lastMessageTime: '15:47',
        messages: [
          { id: 1, sender: 'You', text: 'spcm la lab files submit krde', time: '14:23' },
          { id: 2, sender: 'Bhai', text: 'Project udyaa', time: '15:16' },
        ],
      },
      {
        id: 'chat3',
        name: 'Bunty',
        avatar: avatars[2], // Assign avatar3.jpg
        type: 'individual',
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

    // Compute existing contacts from individual chats
    const existingContacts = computed(() => {
      return chats.value
        .filter(chat => chat.type === 'individual')
        .map(chat => ({
          id: chat.id,
          name: chat.name,
        }));
    });

    const messages = ref([]);
    const selectedChat = computed(() => {
      const chatId = route.params.id;
      return chats.value.find((chat) => chat.id === chatId) || null;
    });

    watch(
      () => route.params.id,
      (newId) => {
        const chatId = newId;
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

    const handleCreateGroup = (newGroup) => {
      // Add the current user to the group members
      newGroup.members.push(currentUserId);
      // Assign a random avatar to the new group
      newGroup.avatar = avatars[Math.floor(Math.random() * avatars.length)];
      chats.value.push(newGroup);
    };

    return { chats, selectedChat, messages, currentUser, existingContacts, selectChat, sendMessage, handleCreateGroup };
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  width: 100%;
  color: #000000;
}

.chat-window-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-window-placeholder p {
  color: #000000;
  font-size: 1.2rem;
}

:deep(::-webkit-scrollbar) {
  width: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: #72cba4;
  border-radius: 10px;
}

:deep(::-webkit-scrollbar-thumb) {
  background-color: #72cba4;
  border-radius: 10px;
  border: 2px solid #72cba4;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background-color: #5bb688;
}

:deep(::-webkit-scrollbar-thumb:active) {
  background-color: #3fa574;
}

:deep(::-webkit-scrollbar-thumb:vertical) {
  background-color: #72cba4;
}
</style>

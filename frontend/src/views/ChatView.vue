<template>
  <div class="chat-container">
    <!-- Sidebar -->
    <chat-sidebar @select-chat="selectChat" @create-group="handleCreateGroup" />

    <!-- Chat Window -->
    <chat-window v-if="chatState.selectedChat" :messages="chatState.messages" :current-user="userState.user"
      @send-message="sendMessage" />
    <div v-else class="chat-window-placeholder">
      <p>Select a chat to start messaging</p>
    </div>
  </div>
</template>
<script>
// import { getRandomImage } from '@/Utils/randomImages'; // Import the utility
import { chatState } from '@/stores/chatStore';
import { userState } from '@/stores/store';
import { useRoute, useRouter } from 'vue-router';
import ChatSidebar from '../components/ChatSidebar.vue';
import ChatWindow from '../components/ChatWindow.vue';
import { watch } from 'vue';

export default {
  name: 'ChatView',
  components: { ChatSidebar, ChatWindow },
  setup() {
    const router = useRouter();
    const route = useRoute();

    // Watch for user changes to fetch chats
    watch(
      () => userState.user,
      async (user) => {
        if (user) {
          await chatState.fetchChats();
        }
      },
      { immediate: true }
    );

    // Watch for route changes to fetch chat
    watch(
      () => route.params.id,
      async (newId) => {
        // console.log('Watcher triggered, new chatId:', newId);
        if (newId) {
          await chatState.selectChat(newId);
        } else {
          chatState.selectedChatId = null;
          chatState.selectedChat = null;
          chatState.messages = [];
        }
      },
      { immediate: true }
    );

    const selectChat = async(chatId) => {
      // chatState.selectChat(chatId)
      router.push({ name: 'chat', params: { id: chatId } });
    };

    const sendMessage = (text) => {
      chatState.sendMessage(text);
    };

    const handleCreateGroup = (newGroup) => {
      chatState.createGroup(newGroup);
    };

    return {
      chatState,
      userState,
      selectChat,
      sendMessage,
      handleCreateGroup,
    };
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

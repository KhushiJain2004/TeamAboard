<template>
  <div class="chat-window">
    <div class="chat-header">
      <img :src="chatState.selectedChat?.avatar" alt="Avatar" class="avatar" />
      <div class="chat-info">
        <h2>{{ chatState.selectedChat.isGroupChat ? chatState.selectedChat.groupName : chatState.selectedChat.receiver.name }}</h2>
        <p v-if="chatState.selectedChat.isGroupChat">(Group Chat)</p>
      </div>
    </div>
    <div class="messages">
      <message v-for="message in messages" :key="message._id" :message="message" :is-own="message.senderId=== currentUser._id"
        :is-group="chatState.selectedChat.isGroupChat" />
    </div>
    <message-input @send="$emit('send-message', $event)" />
  </div>
</template>

<script>
import { chatState } from '@/stores/chatStore';
import Message from './Message.vue';
import MessageInput from './MessageInput.vue';

export default {
  name: 'ChatWindow',
  components: { Message, MessageInput },
  props: {
    messages: {
      type: Array,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      chatState,
    };
  },
};
</script>


<style scoped>
.chat-info p {
  font-size: 0.875rem;
  color: #000000;
}
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #4a5568;
    display: flex;
    align-items: center;
  }

  .chat-header .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .chat-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
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

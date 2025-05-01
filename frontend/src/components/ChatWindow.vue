<template>
  <div class="chat-window">
    <div class="chat-header">
      <img :src="selectedChat.avatar" alt="Avatar" class="avatar" />
      <div class="chat-info">
        <h2>{{ selectedChat.name }}</h2>
        <p v-if="selectedChat.type === 'group'">(Group Chat)</p> <!-- Added -->
      </div>
    </div>
    <div class="messages">
      <message v-for="message in messages" :key="message.id" :message="message" :is-own="message.sender === currentUser"
        :is-group="selectedChat.type === 'group'" />
    </div>
    <message-input @send="$emit('send-message', $event)" />
  </div>
</template>

<script>
import Message from './Message.vue';
import MessageInput from './MessageInput.vue';

export default {
  name: 'ChatWindow',
  components: { Message, MessageInput },
  props: {
    selectedChat: {
      type: Object,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
    currentUser: {
      type: String,
      required: true,
    },
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

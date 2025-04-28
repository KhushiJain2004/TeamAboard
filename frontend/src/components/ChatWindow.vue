<template>
  <div class="chat-window">
    <div class="chat-header">
      <img :src="selectedChat.avatar" alt="Avatar" class="avatar" />
      <h2>{{ selectedChat.name }}</h2>
    </div>
    <div class="messages">
      <message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :is-own="message.sender === currentUser"
      />
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
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #4a5568;
  background-color: #2d3748;
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
  background-color: #2d3748;
}
</style>

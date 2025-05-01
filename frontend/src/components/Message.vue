<template>
  <div class="message" :class="{ 'message-own': isOwn, 'message-other': !isOwn }">
    <div v-if="isGroup && !isOwn" class="sender-name">{{ message.sender }}</div>
    <div class="message-content">
      <p>{{ message.text }}</p>
      <span class="message-time">{{ message.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  props: {
    message: {
      type: Object,
      required: true,
    },
    isOwn: {
      type: Boolean,
      required: true,
    },
    isGroup: { // Added to support group chats
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.sender-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.25rem;
}
.message {
  margin-bottom: 0.5rem;
  display: flex;
}

.message-own {
  justify-content: flex-end;
  /* Sent messages on the right */
}

.message-other {
  justify-content: flex-start;
  /* Received messages on the left */
}

.message-content {
  max-width: 70%;
  padding: 0.75rem;
  border-radius: 10px;
}

.message-own .message-content {
  background-color: #ffffff;
  color: #000000;
}

.message-other .message-content {
  background-color: #005eff;
  color: #fff;
}

.message-content p {
  margin: 0;
}

.message-content span {
  font-size: 0.75rem;
  color: #a0aec0;
  display: block;
  text-align: right;
}
</style>

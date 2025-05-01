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
  font-size: 0.95rem;
    padding: 2px 10px;
    margin: 0 0 6px 12px;
    font-weight: 600;
    color: #1f1f1f;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #ffffffcc;
    border-radius: 12px;
    display: inline-block;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    max-width: fit-content;
  }
  
  .message {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .message-own {
    align-items: flex-end;
  }
  
  .message-other {
    align-items: flex-start;
  }
  
  .message-content {
    max-width: 70%;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    position: relative;
    word-wrap: break-word;
    line-height: 1.4;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  }
  
  .message-own .message-content {
    background-color: #ffffff;
    color: #000000;
    border-bottom-right-radius: 0;
  }
  
  .message-other .message-content {
    background-color: #005eff;
    color: #ffffff;
    border-bottom-left-radius: 0;
  }
  
  .message-content p {
    margin: 0;
    font-size: 0.95rem;
  }
  
  .message-content span {
    font-size: 0.7rem;
    color: #dbe2ef;
  display: block;
  text-align: right;
  margin-top: 4px;
}
</style>

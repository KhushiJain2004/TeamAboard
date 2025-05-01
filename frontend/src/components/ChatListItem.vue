<template>
  <div class="chat-item" @click="$emit('click')">
    <img :src="chat.avatar" alt="Avatar" class="avatar" />
    <div class="chat-info">
      <div class="chat-header">
        <h3>{{ chat.name }}</h3>
        <span>{{ chat.lastMessageTime }}</span>
      </div>
      <p>{{ chat.lastMessage }}</p>
      <span v-if="chat.type === 'group'" class="group-label">(Group Chat)</span> <!-- Added -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatListItem',
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.group-label {
  font-size: 0.75rem;
  color: #000000;
  margin-top: 0.25rem;
  display: block;
}
.chat-item {
  padding: 1rem;
  border-bottom: 1px solid #4a5568;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.chat-item:hover {
  background-color: #41b883;
}
.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
}
.chat-info {
  flex: 1;
}
.chat-header {
  display: flex;
  justify-content: space-between;
}
.chat-header h3 {
  font-weight: 600;
}
.chat-header span {
  font-size: 0.875rem;
  color: #000000;
}
.chat-info p {
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

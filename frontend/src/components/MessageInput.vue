<template>
  <div class="message-input">
    <form @submit.prevent="send">
      <input v-model="newMessage" type="text" placeholder="Type a message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    send() {
      if (this.newMessage.trim()) {
        this.$emit('send', this.newMessage);
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.message-input {
  padding: 1rem;
  border-top: 1px solid #000000;
}
.message-input form {
  display: flex;
  align-items: center;
}
.message-input input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 5px 0 0 5px;
  color: #000000;
  border: none;
}
.message-input button {
  padding: 0.5rem 1rem;
  border-radius: 0 5px 5px 0;
  background-color: #25d366;
  color: #000000;
  border: none;
  cursor: pointer;
}
.message-input button:hover {
  background-color: #1ebd5a;
}
</style>

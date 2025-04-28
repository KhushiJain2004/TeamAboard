<template>
  <div :class="['message', isOwn ? 'message-own' : 'message-other']">
    <div class="message-content">
      <p>{{ message.text }}</p>
      <span>{{ message.time }}</span>
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
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 0.5rem;
  display: flex;
}
.message-own {
  justify-content: flex-end;
}
.message-other {
  justify-content: flex-start;
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

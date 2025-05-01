<template>
  <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <h2>Apply for "{{ postTitle }}"</h2>
      <form @submit.prevent="sendApplication">
        <div class="form-group">
          <label for="message">Message to Creator</label>
          <textarea id="message" v-model="message" placeholder="Write your message here..." rows="5"
            required></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          <button type="submit" class="apply-btn" :disabled="!message.trim()">Send Application</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplyModal',
  props: {
    postId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      message: '',
      postTitle: '',
    };
  },
  watch: {
    postId(newId) {
      if (newId) {
        this.isVisible = true;
        // Fetch post title based on postId (simulated here)
        const post = this.$parent.posts.find(p => p.id === newId);
        this.postTitle = post ? post.title : 'Unknown Post';
      }
    },
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      this.message = '';
      this.$emit('close');
    },
    sendApplication() {
      if (this.message.trim()) {
        console.log('Application sent for post ID:', this.postId, 'Message:', this.message);
        alert('Application sent successfully!');
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  color: #4a5568;
  margin-bottom: 0.375rem;
}

.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn {
  background-color: #e53e3e;
  color: #fff;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.cancel-btn:hover {
  background-color: #c53030;
}

.apply-btn {
  background-color: #41b883;
  color: #fff;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.apply-btn:hover {
  background-color: #2ecc71;
}

.apply-btn:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Webkit browsers */
.posts-container::-webkit-scrollbar {
  width: 8px;
}

.posts-container::-webkit-scrollbar-track {
  background: #e6f4ea;
  border-radius: 10px;
}

.posts-container::-webkit-scrollbar-thumb {
  background-color: #41b883;
  border-radius: 10px;
}

/* Firefox */
.posts-container {
  scrollbar-width: thin;
  scrollbar-color: #41b883 #e6f4ea;
}
</style>

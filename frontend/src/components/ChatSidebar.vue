<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>Chats</h1>
      <div class="header-actions">
        <input type="text" placeholder="Search or start a new chat" v-model="searchQuery" @input="filterChats" />
        <button class="create-group-btn" @click="showCreateGroupModal = true">
          Create Group
        </button>
      </div>
    </div>
    <div class="chat-list">
      <chat-list-item v-for="chat in filteredChats" :key="chat.id" :chat="chat"
        @click="$emit('select-chat', chat.id)" />
    </div>

    <!-- Create Group Modal -->
    <div v-if="showCreateGroupModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Create a New Group</h2>
        <div class="form-group">
          <label>Group Name</label>
          <input v-model="newGroup.name" placeholder="Enter group name" required />
        </div>
        <div class="form-group">
          <label>Select Members (Existing Contacts)</label>
          <div class="members-list">
            <div v-if="existingContacts.length === 0" class="no-contacts">
              No existing contacts available to add.
            </div>
            <div v-else v-for="contact in existingContacts" :key="contact.id" class="member-item">
              <label>
                <input type="checkbox" :value="contact.id" v-model="newGroup.members" />
                {{ contact.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showCreateGroupModal = false">
            Cancel
          </button>
          <button class="create-btn" @click="createGroup" :disabled="!newGroup.name || newGroup.members.length === 0">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatListItem from './ChatListItem.vue';

export default {
  name: 'ChatSidebar',
  components: { ChatListItem },
  props: {
    chats: {
      type: Array,
      required: true,
    },
    existingContacts: { // Added prop
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      filteredChats: this.chats,
      showCreateGroupModal: false, // Added
      newGroup: { // Added
        name: '',
        members: [],
      },
    };
  },
  methods: {
    filterChats() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) {
        this.filteredChats = this.chats;
      } else {
        this.filteredChats = this.chats.filter((chat) =>
          chat.name.toLowerCase().includes(query)
        );
      }
    },
    createGroup() { // Added
      if (!this.newGroup.name || this.newGroup.members.length === 0) {
        alert('Please provide a group name and select at least one member.');
        return;
      }

      const newGroup = {
        id: `group-${Date.now()}`,
        name: this.newGroup.name,
        type: 'group',
        members: this.newGroup.members,
        avatar: 'https://via.placeholder.com/40',
        lastMessage: null,
        lastMessageTime: null,
        messages: [],
      };

      this.$emit('create-group', newGroup);
      this.newGroup = { name: '', members: [] };
      this.showCreateGroupModal = false;
    },
  },
  watch: {
    chats(newChats) {
      this.filteredChats = newChats;
      this.filterChats();
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 33%;
  border-right: 1px solid #4a5568;
  display: flex;
  flex-direction: column;
  padding-left: 80px;

}
.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #4a5568;
}
.sidebar-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.sidebar-header input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  color: #000000;
  border: none;
}
.sidebar-header input::placeholder {
  color: #000000;
    /* Placeholder text color for better visibility */
}
.chat-list {
  flex: 1;
  overflow-y: auto;
}
.header-actions {
  /* Added */
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-header input {
  flex: 1;
  /* Modified */
  padding: 0.5rem;
  border-radius: 5px;
  color: #000000;
  border: none;
}

/* Added styles for modal */
.create-group-btn {
  background-color: #41b883;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.create-group-btn:hover {
  background-color: #2ecc71;
}

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
  animation: fadeIn 0.3s ease-in-out;
  /* Added fade-in animation */
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  /* Increased for a softer look */
  width: 400px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  /* Enhanced shadow for depth */
  background-color: #f9fafb;
  /* Light background for contrast */
  border: 1px solid #e5e7eb;
  /* Subtle border */
  animation: slideUp 0.3s ease-out;
  /* Added slide-up animation */
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content h2 {
  font-size: 1.75rem;
  /* Slightly larger for emphasis */
  font-weight: 700;
  /* Bolder weight */
  margin-bottom: 1.5rem;
  /* More spacing */
  color: #2c3e50;
  text-align: center;
  /* Centered title */
}

.form-group {
  margin-bottom: 1.75rem;
  /* Increased spacing */
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  /* Slightly larger for readability */
  color: #4a5568;
  margin-bottom: 0.375rem;
  /* Adjusted spacing */
  font-weight: 500;
  /* Medium weight for labels */
}

.form-group input {
  width: 100%;
  padding: 0.625rem;
  /* Slightly larger padding */
  border: 2px solid #e2e8f0;
  /* Thicker border */
  border-radius: 6px;
  /* Softer corners */
  font-size: 0.95rem;
  /* Consistent with label */
  transition: border-color 0.2s ease;
  /* Smooth transition on focus */
}

.form-group input:focus {
  border-color: #41b883;
  /* Highlight on focus */
  outline: none;
  /* Remove default outline */
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.2);
  /* Subtle focus ring */
}

.members-list {
  max-height: 250px;
  /* Increased height */
  overflow-y: auto;
  border: 2px solid #e2e8f0;
  /* Thicker border */
  border-radius: 6px;
  /* Softer corners */
  padding: 0.75rem;
  /* More padding */
  background-color: #ffffff;
  /* White background for contrast */
}

.no-contacts {
  color: #a0aec0;
  font-size: 0.95rem;
  /* Slightly larger */
  text-align: center;
  padding: 1rem;
  /* Added padding */
}

.member-item {
  padding: 0.375rem 0;
  /* Adjusted spacing */
}

.member-item label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* Increased gap */
  font-size: 0.95rem;
  /* Consistent size */
  color: #4a5568;
  cursor: pointer;
  /* Indicates clickable */
  transition: color 0.2s ease;
  /* Smooth hover effect */
}

.member-item label:hover {
  color: #2c3e50;
  /* Darker on hover */
}

.member-item input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #41b883;
  /* Custom checkbox color */
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  /* Increased gap */
  margin-top: 1.5rem;
  /* Added top margin */
}

.cancel-btn {
  background-color: #e53e3e;
  color: #fff;
  padding: 0.625rem 1.25rem;
  /* Adjusted padding */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  /* Consistent size */
  transition: background-color 0.2s ease;
  /* Smooth hover */
}

.cancel-btn:hover {
  background-color: #c53030;
}

.create-btn {
  background-color: #41b883;
  color: #fff;
  padding: 0.625rem 1.25rem;
  /* Adjusted padding */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  /* Consistent size */
  transition: background-color 0.2s ease;
  /* Smooth hover */
}

.create-btn:hover {
  background-color: #2ecc71;
}

.create-btn:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
  opacity: 0.7;
  /* Slightly faded when disabled */
}

/* Ensure scrollbar matches app theme */
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

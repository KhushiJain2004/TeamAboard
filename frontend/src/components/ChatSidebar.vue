<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>Chats</h1>
      <input
        type="text"
        placeholder="Search or start a new chat"
        v-model="searchQuery"
        @input="filterChats"
      />
    </div>
    <div class="chat-list">
      <chat-list-item
        v-for="chat in filteredChats"
        :key="chat.id"
        :chat="chat"
        @click="$emit('select-chat', chat.id)"
      />
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
  },
  data() {
    return {
      searchQuery: '', // Stores the search input
      filteredChats: this.chats, // Initially show all chats
    };
  },
  methods: {
    filterChats() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) {
        // If search query is empty, show all chats
        this.filteredChats = this.chats;
      } else {
        // Filter chats based on the search query
        this.filteredChats = this.chats.filter((chat) =>
          chat.name.toLowerCase().includes(query) // Assuming `name` is a property of chat
        );
      }
    },
  },
  watch: {
    // Update filteredChats when the chats prop changes
    chats(newChats) {
      this.filteredChats = newChats;
      this.filterChats(); // Reapply filter if search query exists
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

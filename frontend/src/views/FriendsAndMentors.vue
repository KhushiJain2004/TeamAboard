<!-- eslint-disable no-unused-vars -->
<template>
  <div class="friends-and-mentors-page">
    <!-- Friend Requests Container (1/3) -->
    <div class="friends-and-mentors-container">
      <div class="friends-and-mentors-header">
        <h2>Friends and Mentors</h2>
        <p>{{ activeTab === 'received' ? receivedRequests.length : sentRequests.length }} {{ activeTab === 'received' ?
          'friend requests' : 'sent requests' }}</p>
        <a href="#" @click.prevent="toggleTab" class="view-sent-requests">
          View {{ activeTab === 'received' ? 'sent requests' : 'received requests' }}
        </a>
      </div>
      <div class="friends-and-mentors-list">
        <div v-if="activeTab === 'received'">
          <div v-for="(request, index) in receivedRequests" :key="index" class="friend-request-item">
            <div class="friend-info">
              <img :src="request.avatar" alt="Friend Avatar" class="friend-avatar" />
              <div class="friend-details">
                <h3 class="clickable-name" @click="goToProfile(request.id)">{{ request.name }}</h3>
                <p>{{ request.time }} • {{ request.mutualFriends }} mutual friend{{ request.mutualFriends > 1 ? 's' : ''
}}</p>
              </div>
            </div>
            <div class="friend-actions">
              <button @click="confirmRequest(index)" class="confirm-btn">Confirm</button>
              <button @click="deleteRequest(index)" class="delete-btn">Delete</button>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'sent'">
          <div v-for="(request, index) in sentRequests" :key="index" class="sent-request-item">
            <div class="friend-info">
              <img :src="request.avatar" alt="Friend Avatar" class="friend-avatar" />
              <div class="friend-details">
                <h3 class="clickable-name" @click="goToProfile(request.id)">{{ request.name }}</h3>
                <p>Sent {{ request.time }} ago</p>
              </div>
            </div>
            <div class="friend-actions">
              <button @click="cancelRequest(index)" class="cancel-btn">Cancel</button>
            </div>
          </div>
          <p v-if="sentRequests.length === 0" class="no-requests">No sent requests.</p>
        </div>
      </div>
    </div>

    <!-- Suggestions Container (2/3) -->
    <div class="suggestions-container">
      <!-- Search Box -->
      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="Search for friends..." @input="filterSuggestions" />
      </div>

      <!-- Suggestions -->
      <div class="suggestions-list">
        <div v-for="(suggestion, index) in filteredSuggestions" :key="index" class="suggestion-card">
          <img :src="suggestion.avatar" alt="Suggestion Avatar" class="suggestion-avatar" />
          <div class="suggestion-details">
            <h3 class="clickable-name" @click="goToProfile(suggestion.id)">{{ suggestion.name }}</h3>
            <p>{{ suggestion.tag }}</p>
          </div>
          <button @click="followSuggestion(index)" class="follow-btn">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomImage } from '@/Utils/randomImages';

// Mock Data Configuration
const mockData = {
  firstNames: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 'Charlotte', 'James', 'Amelia', 'William'],
  lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'],
  timePeriods: ['2 d', '1 w', '3 w', '1 m', '2 m', '6 m', '1 y', '2 y'],
  tags: ['Photographer', 'Developer', 'Designer', 'Traveler', 'Foodie', 'Gamer', 'Musician', 'Artist', 'Writer', 'Athlete']
};

// Mock Data Generator
const generateMockData = {
  getName: () => `${mockData.firstNames[Math.floor(Math.random() * mockData.firstNames.length)]} ${mockData.lastNames[Math.floor(Math.random() * mockData.lastNames.length)]}`,
  getTime: () => mockData.timePeriods[Math.floor(Math.random() * mockData.timePeriods.length)],
  getTag: () => mockData.tags[Math.floor(Math.random() * mockData.tags.length)],
  getMutualFriends: () => Math.floor(Math.random() * 10),
  getId: () => Date.now() + Math.random().toString(36).substr(2, 9), // Generate a unique ID

  requests: (count, isSent = false) => {
    return Array.from({ length: count }, () => ({
      id: generateMockData.getId(),
      name: generateMockData.getName(),
      time: generateMockData.getTime(),
      ...(!isSent && { mutualFriends: generateMockData.getMutualFriends() }),
      avatar: getRandomImage()
    }));
  },

  suggestions: (count) => {
    return Array.from({ length: count }, () => ({
      id: generateMockData.getId(),
      name: generateMockData.getName(),
      tag: generateMockData.getTag(),
      avatar: getRandomImage()
    }));
  }
};

export default {
  name: 'FriendsAndMentors',
  data() {
    return {
      activeTab: 'received',
      receivedRequests: [],
      sentRequests: [],
      suggestions: [],
      searchQuery: '',
      filteredSuggestions: [],
      isLoading: false,
      error: null
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      this.isLoading = true;
      try {
        await this.loadMockData();
      } catch (err) {
        this.error = err.message;
        console.error('Failed to load data:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async loadMockData() {
      this.receivedRequests = generateMockData.requests(15);
      this.sentRequests = generateMockData.requests(10, true);
      this.suggestions = generateMockData.suggestions(12);
      this.filteredSuggestions = [...this.suggestions];
    },

    async confirmRequest(index) {
      const request = this.receivedRequests[index];
      console.log('Confirmed request:', request.name);
      this.receivedRequests.splice(index, 1);
    },

    async deleteRequest(index) {
      const request = this.receivedRequests[index];
      console.log('Deleted request:', request.name);
      this.receivedRequests.splice(index, 1);
    },

    async cancelRequest(index) {
      const request = this.sentRequests[index];
      console.log('Cancelled request:', request.name);
      this.sentRequests.splice(index, 1);
    },

    async followSuggestion(index) {
      const suggestion = this.filteredSuggestions[index];
      console.log('Followed suggestion:', suggestion.name);
      this.filteredSuggestions.splice(index, 1);
    },

    toggleTab() {
      this.activeTab = this.activeTab === 'received' ? 'sent' : 'received';
    },

    filterSuggestions() {
      const query = this.searchQuery.toLowerCase();
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(query) ||
        suggestion.tag.toLowerCase().includes(query)
      );
    },

    goToProfile(userId) {
      this.$router.push(`/profile/${userId}`);
    }
  }
};
</script>

<style scoped>
.friends-and-mentors-page {
  display: flex;
  height: 100vh;
}

.friends-and-mentors-container {
  width: 33.33%;
  padding: 1rem;
  margin-left: 7rem;
  padding-left: 3rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  overflow-y: auto;
}

.friends-and-mentors-header {
  margin-bottom: 1.8rem;
}

.friends-and-mentors-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.friends-and-mentors-header p {
  font-size: 0.875rem;
  color: #718096;
}

.view-sent-requests {
  font-size: 0.875rem;
  color: #48bb78;
  text-decoration: none;
}

.view-sent-requests:hover {
  text-decoration: underline;
}

.friends-and-mentors-list {
  margin-top: 1rem;
}

.friend-request-item,
.sent-request-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.friend-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.friend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.clickable-name {
  cursor: pointer;
  transition: color 0.2s ease;
}

.clickable-name:hover {
  color: #48bb78;
}
.friend-details p {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
}

.friend-actions {
  display: flex;
  gap: 0.5rem;
}

.confirm-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.confirm-btn:hover {
  background-color: #38a169;
}

.delete-btn {
  background-color: #e2e8f0;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.delete-btn:hover {
  background-color: #cbd5e0;
}

.cancel-btn {
  background-color: #e2e8f0;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.cancel-btn:hover {
  background-color: #cbd5e0;
}

.no-requests {
  font-size: 0.875rem;
  color: #718096;
  text-align: center;
  margin-top: 1rem;
}

/* Suggestions Section (2/3) */
.suggestions-container {
  width: 66.67%;
  padding: 2rem;
  overflow-y: auto;
}

.search-box {
  margin-bottom: 2rem;
}

.search-box input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
}

.search-box input:focus {
  border-color: #48bb78;
  box-shadow: 0 0 5px rgba(72, 187, 120, 0.3);
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.suggestion-card {
  flex: 1 1 calc(33.33% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.suggestion-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.suggestion-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.suggestion-details p {
  font-size: 0.875rem;
  color: #718096;
  margin: 0.25rem 0 0.5rem;
}

.follow-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
}

.follow-btn:hover {
  background-color: #38a169;
}

/* Custom Scrollbar */
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

<template>
  <div class="portfolio-wrapper">
    <div class="portfolio-container">
      <!-- Header Card -->
      <div class="portfolio-card header-card">
        <div class="header-content">
          <img :src="user.avatar" alt="User Avatar" class="avatar" />
          <div class="header-info">
            <h1>{{ user.name }}</h1>
            <p class="role">{{ user.role }}</p>
            <p class="availability" :class="{ available: user.availability === 'openToJoin' }">
              {{ user.availability === 'openToJoin' ? 'Open to Join' : 'Not Available' }}
            </p>
            <div class="contact-info">
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p v-if="user.phoneNumber"><strong>Phone:</strong> {{ user.phoneNumber }}</p>
              <p v-if="user.location"><strong>Location:</strong> {{ user.location }}</p>
            </div>
          </div>
          <div class="social-links">
            <p v-if="user.socialLinks.linkedin">
              <a :href="user.socialLinks.linkedin" target="_blank" class="social-icon">LinkedIn</a>
            </p>
            <p v-if="user.socialLinks.github">
              <a :href="user.socialLinks.github" target="_blank" class="social-icon">GitHub</a>
            </p>
            <p v-for="(link, index) in user.socialLinks.Others" :key="index">
              <a :href="link.link" target="_blank" class="social-icon">{{ link.platform }}</a>
            </p>
          </div>
          <!-- Add Friend and Follow Buttons (Visible if not the current user's profile) -->
          <!-- <div v-if="showButtons" class="header-actions"> -->
          <div class="header-actions">
            <button @click="addFriend" class="action-btn friend-btn">+Friend</button>
            <button @click="followUser" class="action-btn follow-btn">Follow</button>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <div class="portfolio-card">
        <h2>Summary</h2>
        <p>{{ user.bio || 'No summary provided.' }}</p>
      </div>

      <!-- Personal Details Card -->
      <div class="portfolio-card">
        <h2>Personal Details</h2>
        <p><strong>Age:</strong> {{ user.age || 'Not specified' }}</p>
        <p><strong>Gender:</strong> {{ user.gender || 'Not specified' }}</p>
        <p v-if="user.role === 'Student'"><strong>Current College Year:</strong> {{ user.currentCollegeYear ||
          'Notspecified' }}</p>
      </div>

      <!-- Education Card -->
      <div class="portfolio-card">
        <h2>Education</h2>
        <div v-for="(edu, index) in user.education" :key="index" class="sub-card">
          <p><strong>{{ edu.degreeType }} in {{ edu.course }}</strong></p>
          <p>{{ edu.institution }} ({{ edu.startYear }} - {{ edu.yearOfCompletion }})</p>
        </div>
        <p v-if="!user.education.length">No education details provided.</p>
      </div>

      <!-- Skills Card -->
      <div class="portfolio-card">
        <h2>Skills</h2>
        <div v-for="(skillEntry, index) in user.userSkills" :key="index" class="sub-card">
          <p><strong>{{ skillEntry.category }}:</strong> {{ skillEntry.skill.join(', ') }}</p>
        </div>
        <p v-if="!user.userSkills.length">No skills listed.</p>
      </div>

      <!-- Field of Expertise Card -->
      <div class="portfolio-card">
        <h2>Fields of Expertise</h2>
        <div class="expertise-list">
          <span v-for="(field, index) in user.fieldOfExpertise" :key="index" class="expertise-tag">{{ field }}</span>
        </div>
        <p v-if="!user.fieldOfExpertise.length">No fields of expertise listed.</p>
      </div>

      <!-- Coding Profile Card -->
      <div class="portfolio-card">
        <h2>Coding Profile</h2>
        <p><strong>Coding Level:</strong> {{ user.codingLevel || 'Not specified' }}</p>
        <div v-for="(rank, index) in user.codingRanks" :key="index" class="sub-card">
          <p><strong>{{ rank.platform }}:</strong> Rank {{ rank.rank }} (<a :href="rank.profileLink" target="_blank">{{
            rank.platform }} Profile</a>)</p>
        </div>
        <p v-if="!user.codingRanks.length">No coding ranks provided.</p>
      </div>

      <!-- Interests Card -->
      <div class="portfolio-card">
        <h2>Interests</h2>
        <div class="interests-list">
          <span v-for="(interest, index) in user.interests" :key="index" class="interest-tag">{{ interest }}</span>
        </div>
        <p v-if="!user.interests.length">No interests listed.</p>
      </div>
    </div>
  </div>
</template>

<script>
import avatarImage from '@/assets/images/avatar.jpg';

export default {
  name: 'VisitorProfile',
  props: {
    currentUserId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      user: {
        id: 'user123456', // Unique ID added
        name: 'Mobina Mirbagheri',
        email: 'mobina@example.com',
        password: 'securepassword123', // Not displayed
        avatar: avatarImage,
        age: 29,
        bio: 'Passionate developer with a focus on frontend technologies.',
        gender: 'Female',
        location: 'Tehran, Iran',
        role: 'Student',
        fieldOfExpertise: ['Web Development', 'UI/UX Design'],
        userSkills: [
          { category: 'Frontend', skill: ['JavaScript', 'Vue.js'] },
          { category: 'Backend', skill: ['Node.js'] },
        ],
        codingRanks: [
          { platform: 'LeetCode', rank: 1500, profileLink: 'https://leetcode.com/user' },
          { platform: 'HackerRank', rank: 1200, profileLink: 'https://hackerrank.com/user' },
        ],
        codingLevel: 'intermediate',
        interests: ['Photography', 'Traveling'],
        education: [
          { institution: 'Tech University', degreeType: 'Bachelors', course: 'Computer Science', startYear: 2018, yearOfCompletion: 2022 },
        ],
        currentCollegeYear: 3,
        availability: 'openToJoin',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/mobina-mirbagheri',
          github: 'https://github.com/mobinamir',
          Others: [
            { platform: 'Twitter', link: 'https://twitter.com/mobina_mir' },
          ],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: '+989120000000',
      },
    };
  },
  computed: {
    showButtons() {
      console.log('currentUserId:', this.currentUserId, 'user.id:', this.user.id); // Debug log
      return this.currentUserId && this.currentUserId !== this.user.id;
    }
  },
  methods: {
    addFriend() {
      console.log(`Sending friend request to ${this.user.name} (ID: ${this.user.id})`);
      // Replace with actual API call or logic
    },
    followUser() {
      console.log(`Following ${this.user.name} (ID: ${this.user.id})`);
      // Replace with actual API call or logic
    },
  },
};
</script>

<style scoped>
.portfolio-wrapper {
  min-height: 100vh;
  padding: 1rem;
}

.portfolio-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.portfolio-card {
  background: #ffffff;
  border-radius: 12px;
  height: 300px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.header-card {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #41b883 0%, #2ecc71 100%);
  color: #ffffff;
  padding: 1.5rem;
  position: relative;
  /* Ensure proper positioning context */
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  }
  
  .header-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    /* Ensure buttons are above other content */
  }
  
  .action-btn {
    background: #ffffff;
    color: #41b883;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .friend-btn {
    background: #005eff;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .follow-btn {
    background: #cc1b1b;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .friend-btn:hover {
    background: #e6f4ea;
    color: #2c3e50;
  }
  
  .follow-btn:hover {
    background: #e6f4ea;
    color: #2c3e50;
  }
  
  .avatar {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    object-fit: cover;
  }
  
  .header-info {
    flex: 1;
  }
  
  .header-info h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
  }
  
  .role {
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0.25rem 0;
    color: #e6f4ea;
  }
  
  .availability {
    font-size: 0.85rem;
    font-weight: 500;
    margin: 0.25rem 0;
    color: #ffffff;
  }
  
  .availability.available {
    color: #ffeb3b;
  }
  
  .contact-info p {
    font-size: 0.85rem;
    margin: 0.25rem 0;
    color: #e6f4ea;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .social-icon {
    background: #ffffff;
    color: #41b883;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .social-icon:hover {
    background: #e6f4ea;
    color: #2c3e50;
  }
  
  .portfolio-card h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid #41b883;
  }
  
  .portfolio-card p {
    font-size: 0.85rem;
    color: #4a5568;
    margin: 0.25rem 0;
    line-height: 1.4;
  }
  
  .sub-card {
    background: #f9fafb;
    border-radius: 6px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-left: 3px solid #41b883;
  }
  
  .sub-card p {
    margin: 0;
  }
  
  .sub-card a {
    color: #2ecc71;
    text-decoration: none;
  }
  
  .sub-card a:hover {
    text-decoration: underline;
    color: #27ae60;
  }
  
  .expertise-list,
  .interests-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .expertise-tag,
  .interest-tag {
    background: #e6f4ea;
    color: #2c3e50;
    padding: 0.3rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
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
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .portfolio-container {
      grid-template-columns: 1fr;
    }
  
    .header-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }
  
    .avatar {
      width: 60px;
      height: 60px;
    }
  
    .header-info h1 {
      font-size: 1.25rem;
    }
  
    .social-links {
      justify-content: center;
    }
  
    .header-actions {
      position: static;
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    .action-btn {
      width: 100%;
    }
}
</style>

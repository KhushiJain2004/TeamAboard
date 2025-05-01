<template>
  <div class="post-creation-container">
    <!-- Collapsible Input Section -->
    <div class="post-input-section" @click="expandForm">
      <img :src="userAvatar" alt="User Avatar" class="avatar" />
      <input type="text" v-model="post.title" placeholder="Start a post" class="post-input" @focus="expandForm" />
    </div>

    <!-- Expanded Form -->
    <transition name="slide">
      <div v-if="isFormExpanded" class="expanded-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" type="text" v-model="post.title" placeholder="e.g., Need a frontend developer" />
          <span class="error" v-if="!post.title.trim()">Title is required</span>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="post.description" placeholder="Describe your post (e.g., project details)"
            rows="4"></textarea>
          <span class="error" v-if="!post.description.trim()">Description is required</span>
        </div>
        <div class="form-group">
          <label for="purpose">Purpose</label>
          <input id="purpose" type="text" v-model="post.purpose" placeholder="Purpose (e.g., Build MVP for demo day)" />
          <span class="error" v-if="!post.purpose.trim()">Purpose is required</span>
        </div>
        <div class="form-group">
          <label for="requiredSkills">Required Skills (comma-separated)</label>
          <input id="requiredSkills" type="text" v-model="skillsInput" placeholder="e.g., React, CSS, JavaScript" />
          <span class="error" v-if="!validSkills">At least one skill is required</span>
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input id="location" type="text" v-model="post.location" placeholder="e.g., Remote" />
          <span class="error" v-if="!post.location.trim()">Location is required</span>
        </div>
        <div class="form-group">
          <label for="tags">Tags (comma-separated)</label>
          <input id="tags" type="text" v-model="tagsInput" placeholder="e.g., Hackathon, Frontend, Remote" />
          <span class="error" v-if="!validTags">At least one tag is required</span>
        </div>
        <div class="form-group">
          <label for="deadline">Deadline</label>
          <input id="deadline" type="date" v-model="post.deadline" :min="minDate" />
          <span class="error" v-if="!post.deadline || post.deadline.trim() === ''">Deadline is required</span>
        </div>
        <div class="form-group">
          <label for="teamSize">Team Size</label>
          <input id="teamSize" type="number" v-model.number="post.teamSize" min="1" placeholder="e.g., 3" />
          <span class="error" v-if="!validTeamSize">Team size must be greater than 0</span>
        </div>
        <div class="form-actions">
          <button class="action-btn video-btn" @click="handleVideoUpload">
            <span class="icon">🎥</span> Video
          </button>
          <button class="action-btn photo-btn" @click="handlePhotoUpload">
            <span class="icon">📸</span> Photo
          </button>
          <button class="action-btn article-btn" @click="handleArticle">
            <span class="icon">📝</span> Write Article
          </button>
          <button class="submit-btn" @click="createPost" :disabled="!isFormValid">
            Post
          </button>
          <button class="cancel-btn" @click="isFormExpanded = false">
            <span class="icon">✖</span> Cancel
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import avatarImage from '@/assets/images/avatar.jpg';

export default {
  name: 'PostCreation',
  data() {
    return {
      userAvatar: avatarImage,
      isFormExpanded: false,
      post: {
        created_by: 'user123',
        title: '',
        description: '',
        purpose: '',
        requiredSkills: [],
        location: '',
        tags: [],
        deadline: '',
        teamSize: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      skillsInput: '',
      tagsInput: '',
    };
  },
  computed: {
    minDate() {
      return new Date().toISOString().split('T')[0]; // Prevent past dates
    },
    validSkills() {
      return this.post.requiredSkills.length > 0 && this.post.requiredSkills.every(skill => skill.trim().length > 0);
    },
    validTags() {
      return this.post.tags.length > 0 && this.post.tags.every(tag => tag.trim().length > 0);
    },
    validTeamSize() {
      return this.post.teamSize !== null && this.post.teamSize > 0;
    },
    isFormValid() {
      const validTitle = this.post.title.trim().length > 0;
      const validDescription = this.post.description.trim().length > 0;
      const validPurpose = this.post.purpose.trim().length > 0;
      const validSkills = this.validSkills;
      const validLocation = this.post.location.trim().length > 0;
      const validTags = this.validTags;
      const validDeadline = this.post.deadline && this.post.deadline.trim() !== '';
      const validTeamSize = this.validTeamSize;

      const isValid = validTitle && validDescription && validPurpose && validSkills && validLocation && validTags && validDeadline && validTeamSize;

      console.log('Validation Details:', {
        validTitle,
        validDescription,
        validPurpose,
        validSkills,
        requiredSkills: this.post.requiredSkills,
        validLocation,
        validTags,
        tags: this.post.tags,
        validDeadline,
        deadline: this.post.deadline,
        validTeamSize,
        teamSize: this.post.teamSize,
        isFormValid: isValid,
      });

      return isValid;
    },
  },
  watch: {
    skillsInput(newValue) {
      const skills = newValue
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      this.post.requiredSkills = skills;
      console.log('Skills updated:', this.post.requiredSkills);
    },
    tagsInput(newValue) {
      const tags = newValue
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      this.post.tags = tags;
      console.log('Tags updated:', this.post.tags);
    },
    'post.deadline'(newValue) {
      console.log('Deadline updated:', newValue);
      this.post.deadline = newValue || '';
    },
    'post.teamSize'(newValue) {
      console.log('Team size updated:', newValue);
    },
  },
  methods: {
    expandForm() {
      this.isFormExpanded = true;
    },
    createPost() {
      if (this.isFormValid) {
        const postToCreate = {
          ...this.post,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          id: Date.now(),
        };
        console.log('Post to be created:', postToCreate);
        this.$emit('create-post', postToCreate);
        console.log('Event emitted');

        // Reset form
        this.post = {
          created_by: 'user123',
          title: '',
          description: '',
          purpose: '',
          requiredSkills: [],
          location: '',
          tags: [],
          deadline: '',
          teamSize: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.skillsInput = '';
        this.tagsInput = '';
        this.isFormExpanded = false;
        console.log('Form reset');
      } else {
        console.error('Form is invalid. Check logs for details.');
        alert('Form is invalid. Please ensure all fields are correctly filled. Check console for details.');
      }
    },
    handleVideoUpload() {
      alert('Video upload functionality not implemented.');
    },
    handlePhotoUpload() {
      alert('Photo upload functionality not implemented.');
    },
    handleArticle() {
      alert('Write article functionality not implemented.');
    },
  },
};
</script>


<style scoped>
.post-creation-container {
  width: 100%;
  margin: 1rem 0;
  border-radius: 12px;
  background-color: #e6f4ea;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.post-input-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.post-input-section:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.post-input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  background: transparent;
  outline: none;
  width: 100%;
}

.placeholder-text {
  color: #718096;
  font-size: 1rem;
  flex: 1;
  padding: 0.75rem;
}

.expanded-form {
  margin-top: 1rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #41b883;
  outline: none;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.video-btn {
  background: #e6f4ea;
  color: #41b883;
}

.video-btn:hover {
  background: #d1e9d7;
  transform: translateY(-2px);
}

.photo-btn {
  background: #e6f0fa;
  color: #1e90ff;
}

.photo-btn:hover {
  background: #d1e4ff;
  transform: translateY(-2px);
}

.article-btn {
  background: #fef2e8;
  color: #ff6347;
}

.article-btn:hover {
  background: #ffe4d5;
  transform: translateY(-2px);
}

.submit-btn {
  background: #41b883;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background: #2ecc71;
  transform: translateY(-2px);
}

.cancel-btn {
  background: #8a0000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-btn:hover {
  background: #ee1616;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #b0bec5;
  cursor: not-allowed;
  opacity: 0.7;
}

.icon {
  font-size: 1.2rem;
}

.error {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
  .post-creation-container {
    padding-left: 0;
    width: 100%;
  }

  .post-input-section {
    padding: 0.5rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-btn,
  .submit-btn {
    width: 100%;
    text-align: center;
  }
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

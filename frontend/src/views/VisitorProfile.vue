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
          <!-- Add Friend and Follow Buttons -->
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

      <!-- Projects Card -->
      <div class="portfolio-card">
        <h2>Projects</h2>
        <div v-for="(project, index) in user.projects" :key="index" class="sub-card">
          <p><strong>{{ project.title }}</strong></p>
          <p>{{ project.description }}</p>
        </div>
        <p v-if="!user.projects.length">No projects listed.</p>
      </div>

      <!-- User Posts Card -->
      <div class="portfolio-card user-posts-card">
        <h2>User Posts</h2>
        <div v-for="(post, index) in user.posts" :key="index" class="sub-card post-card">
          <p class="post-title"><strong>{{ post.title }}</strong></p>
          <p class="post-description">{{ post.description }}</p>
          <p class="post-skills"><strong>Skills Required:</strong> {{ post.skills.join(', ') }}</p>
          <p class="post-deadline"><strong>Deadline:</strong> {{ formatDate(post.deadline) }}</p>
          <div class="applicants-section">
            <p class="applicants-header">
              <strong>Applicants ({{ post.applicants.length }})</strong>
              <button v-if="post.applicants.length" @click="toggleApplicants(index)" class="toggle-btn">
                {{ post.showApplicants ? 'Hide' : 'Show' }}
              </button>
            </p>
            <div v-if="post.applicants.length && post.showApplicants" class="applicants-list">
              <div v-for="(applicant, idx) in post.applicants" :key="idx" class="applicant-card">
                <img :src="applicant.avatar" alt="Applicant Avatar" class="applicant-avatar" />
                <div class="applicant-details">
                  <p class="applicant-name">{{ applicant.name }}</p>
                  <p class="applicant-role">{{ applicant.role || 'Not specified' }}</p>
                  <p class="applicant-bio">{{ truncateBio(applicant.bio) || 'No bio provided.' }}</p>
                  <div class="applicant-skills">
                    <span v-for="(skill, skillIdx) in applicant.skills" :key="skillIdx" class="skill-tag">{{ skill
                      }}</span>
                  </div>
                  <div class="applicant-social-links">
                    <a v-if="applicant.socialLinks.linkedin" :href="applicant.socialLinks.linkedin" target="_blank"
                      class="social-icon">LinkedIn</a>
                    <a v-if="applicant.socialLinks.github" :href="applicant.socialLinks.github" target="_blank"
                      class="social-icon">GitHub</a>
                    <a v-for="(link, linkIdx) in applicant.socialLinks.Others" :key="linkIdx" :href="link.link"
                      target="_blank" class="social-icon">{{ link.platform }}</a>
                  </div>
                  <div class="applicant-actions">
                    <router-link :to="'/profile/' + applicant.id" class="view-profile-btn">View Profile</router-link>
                    <button @click="acceptApplicant(index, idx)" class="accept-btn">Accept and Message</button>
                    <button @click="rejectApplicant(index, idx)" class="reject-btn">Reject</button>
                  </div>
                </div>
              </div>
            </div>
            <p v-else-if="!post.applicants.length" class="no-applicants">No applicants yet.</p>
          </div>
        </div>
        <p v-if="!user.posts.length">No posts created.</p>
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
        id: 'user123456',
        name: 'Mobina Mirbagheri',
        email: 'mobina@example.com',
        password: 'securepassword123',
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
        projects: [
          {
            title: 'Portfolio Website',
            description: 'A responsive personal portfolio built with Vue.js and Tailwind CSS.'
          },
          {
            title: 'Task Manager App',
            description: 'A full-stack task management application using Node.js and MongoDB.'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: '+989120000000',
        posts: [
          {
            id: 'post1',
            title: 'Frontend Developer for Hackathon',
            description: 'Looking for a Vue.js developer to join our hackathon team.',
            skills: ['Vue.js', 'CSS', 'JavaScript'],
            deadline: new Date('2025-06-15'),
            createdAt: new Date(),
            applicants: [
              {
                id: 'applicant1',
                name: 'Ali Reza',
                avatar: avatarImage,
                role: 'Developer',
                bio: 'Experienced frontend developer with a passion for Vue.js.',
                skills: ['Vue.js', 'TypeScript', 'CSS'],
                socialLinks: {
                  linkedin: 'https://linkedin.com/in/ali-reza',
                  github: 'https://github.com/alireza',
                  Others: []
                }
              },
              {
                id: 'applicant2',
                name: 'Sara Khan',
                avatar: avatarImage,
                role: 'Student',
                bio: 'Computer science student interested in web development.',
                skills: ['CSS', 'JavaScript', 'HTML'],
                socialLinks: {
                  linkedin: '',
                  github: 'https://github.com/sarakhan',
                  Others: [{ platform: 'Twitter', link: 'https://twitter.com/sarakhan' }]
                }
              },
              {
                id: 'applicant3',
                name: 'John Doe',
                avatar: avatarImage,
                role: 'Designer',
                bio: 'UI/UX designer with a passion for Vue.js.',
                skills: ['HTML', 'Vue.js', 'Figma'],
                socialLinks: {
                  linkedin: 'https://linkedin.com/in/johndoe',
                  github: '',
                  Others: []
                }
              }
            ],
            acceptedApplicants: [],
            showApplicants: false
          },
          {
            id: 'post2',
            title: 'AI Project Collaborator',
            description: 'Need an AI enthusiast for a machine learning project.',
            skills: ['Python', 'TensorFlow'],
            deadline: new Date('2025-07-01'),
            createdAt: new Date(),
            applicants: [],
            acceptedApplicants: [],
            showApplicants: false
          }
        ]
      }
    };
  },
  computed: {
    showButtons() {
      console.log('currentUserId:', this.currentUserId, 'user.id:', this.user.id);
      return this.currentUserId && this.currentUserId !== this.user.id;
    },
    isPostCreator() {
      return this.currentUserId === this.user.id;
    }
  },
  methods: {
    addFriend() {
      console.log(`Sending friend request to ${this.user.name} (ID: ${this.user.id})`);
    },
    followUser() {
      console.log(`Following ${this.user.name} (ID: ${this.user.id})`);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    toggleApplicants(postIndex) {
      try {
        console.log(`Toggling applicants for post ${postIndex}, current showApplicants: ${this.user.posts[postIndex].showApplicants}`);
        this.user.posts[postIndex].showApplicants = !this.user.posts[postIndex].showApplicants;
        console.log(`New showApplicants: ${this.user.posts[postIndex].showApplicants}`);
      } catch (error) {
        console.error('Error toggling applicants:', error);
      }
    },
    truncateBio(bio) {
      if (!bio) return '';
      return bio.length > 50 ? bio.substring(0, 47) + '...' : bio;
    },
    acceptApplicant(postIndex, applicantIndex) {
      try {
        const post = this.user.posts[postIndex];
        const applicant = post.applicants[applicantIndex];
        console.log(`Accepting ${applicant.name} for post ${post.title}`);

        // Add to acceptedApplicants
        if (!post.acceptedApplicants) {
          post.acceptedApplicants = [];
        }
        post.acceptedApplicants.push({ ...applicant, acceptedAt: new Date() });

        // Remove from applicants
        post.applicants.splice(applicantIndex, 1);

        // Navigate to messaging route
        this.$router.push(`/messages/${applicant.id}`);
        console.log(`Initiating message to ${applicant.name}`);
      } catch (error) {
        console.error('Error accepting applicant:', error);
      }
    },
    rejectApplicant(postIndex, applicantIndex) {
      try {
        const post = this.user.posts[postIndex];
        const applicant = post.applicants[applicantIndex];
        console.log(`Rejecting ${applicant.name} for post ${post.title}`);

        // Remove from applicants
        post.applicants.splice(applicantIndex, 1);
      } catch (error) {
        console.error('Error rejecting applicant:', error);
      }
    }
  }
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
  padding: 1.25rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow-y: auto;
}

.portfolio-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.user-posts-card {
  height: 500px;
  grid-column: 1 / -1;
  padding: 1.5rem;
}
.header-card {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #41b883 0%, #2ecc71 100%);
  color: #ffffff;
  padding: 1.5rem;
  position: relative;
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
}

.follow-btn {
  background: #cc1b1b;
  color: #ffffff;
}

.friend-btn:hover,
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

.post-card {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.post-card:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.post-description {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.post-skills {
  font-size: 0.9rem;
  color: #41b883;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.post-deadline {
  font-size: 0.9rem;
  color: #4a5568;
}

.applicants-section {
  margin-top: 1rem;
}

.applicants-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.toggle-btn {
  background: #41b883;
  color: #ffffff;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background: #2ecc71;
}

.applicants-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.applicant-card {
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  min-height: 180px;
  align-items: flex-start;
  gap: 1rem;
}

.applicant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.applicant-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #41b883;
  object-fit: cover;
  flex-shrink: 0;
}

.applicant-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.applicant-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.applicant-role {
  font-size: 0.8rem;
  color: #718096;
  margin: 0;
}

.applicant-bio {
  font-size: 0.75rem;
  color: #4a5568;
  margin: 0;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.applicant-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.skill-tag {
  background: #e6f4ea;
  color: #2c3e50;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
}

.applicant-social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 100%;
}

.applicant-social-links .social-icon {
  background: #41b883;
  color: #ffffff;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  white-space: nowrap;
}

.applicant-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.view-profile-btn {
  background: #ffffff;
  color: #41b883;
  padding: 0.4rem 0.85rem;
  border: #41b883;
  border-radius: 12px;
  font-size: 0.8rem;
  text-decoration: none;
  text-align: center;
  transition: background 0.3s ease;
}

.view-profile-btn:hover {
  background: #2ecc71;
}

.accept-btn {
  background: #28a745;
  color: #ffffff;
  padding: 0.4rem 0.85rem;
  border: none;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.accept-btn:hover {
  background: #218838;
}

.reject-btn {
  background: #dc3545;
  color: #ffffff;
  padding: 0.4rem 0.85rem;
  border: none;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.reject-btn:hover {
  background: #c82333;
}

.no-applicants {
  font-size: 0.85rem;
  color: #718096;
  font-style: italic;
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

  .user-posts-card {
    height: 400px;
    grid-column: 1 / -1;
    padding: 1.25rem;
  }

  .post-title {
    font-size: 0.95rem;
  }

  .post-description,
  .post-skills,
  .post-deadline {
    font-size: 0.85rem;
  }

  .applicants-header {
    font-size: 0.85rem;
  }

  .applicant-card {
    flex-direction: column;
    align-items: center;
    min-height: auto;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .applicant-avatar {
    width: 40px;
    height: 40px;
  }

  .applicant-details {
    align-items: center;
    text-align: center;
  }

  .applicant-name {
    font-size: 0.85rem;
  }

  .applicant-role {
    font-size: 0.75rem;
  }

  .applicant-bio {
    font-size: 0.7rem;
  }

  .skill-tag {
    font-size: 0.65rem;
  }

  .applicant-social-links .social-icon {
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }

  .applicant-actions {
    flex-direction: column;
    align-items: center;
  }

  .view-profile-btn,
  .accept-btn,
  .reject-btn {
    padding: 0.3rem 0.75rem;
    font-size: 0.75rem;
    width: 100%;
    max-width: 150px;
  }
}
</style>

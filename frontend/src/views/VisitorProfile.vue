<template>
  <div class="visitor-profile-container">
    <div class="main-content">
      <!-- Profile Header -->
      <div class="profile-header">
        <img src="@/assets/images/avatar.jpg" alt="User Avatar" class="avatar" />
        <div class="user-info">
          <h1>{{ user.firstName }} {{ user.surname }}</h1>
          <p>{{ user.statusMessage }}</p>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="profile-details">
        <!-- Personal Section -->
        <div class="section">
          <h2>Personal</h2>
          <p><strong>First Name:</strong> {{ user.firstName }}</p>
          <p><strong>Surname:</strong> {{ user.surname }}</p>
          <p><strong>About:</strong> {{ user.statusMessage }}</p>
          <p><strong>Date of Birth:</strong> {{ user.dateOfBirth }}</p>
          <p><strong>Education Level:</strong> {{ user.educationLevel }}</p>
        </div>

        <!-- Contact Section -->
        <div class="section">
          <h2>Contact</h2>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone Number:</strong> {{ user.phoneNumber }}</p>
          <p><strong>Country:</strong> {{ user.country }}</p>
          <p><strong>City:</strong> {{ user.city }}</p>
        </div>

        <!-- Skills Section -->
        <div class="section">
          <h2>Skills</h2>
          <ul>
            <li v-for="(skill, index) in user.skills" :key="index">{{ skill }}</li>
          </ul>
        </div>

        <!-- Interests Section -->
        <div class="section">
          <h2>Interests</h2>
          <ul>
            <li v-for="(interest, index) in user.interests" :key="index">{{ interest }}</li>
          </ul>
        </div>

        <!-- Experience Section -->
        <div class="section">
          <h2>Experience</h2>
          <div v-for="(exp, index) in user.experience" :key="index" class="experience-item">
            <p><strong>{{ exp.jobTitle }}</strong> at {{ exp.company }} ({{ exp.from }} - {{ exp.to }})</p>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="section">
          <h2>Projects</h2>
          <div v-for="(project, index) in user.projects" :key="index" class="project-item">
            <p><strong>{{ project.name }}</strong></p>
            <p>GitHub: <a :href="project.githubLink" target="_blank">{{ project.githubLink }}</a></p>
            <p>Tech Stack: {{ project.techStack }}</p>
            <p>Team Members: {{ project.teamMembers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisitorProfile',
  data() {
    return {
      user: {
        avatar: '@/assets/images/avatar.jpg',
        firstName: 'Mobina',
        surname: 'Mirbagheri',
        nationalCode: '',
        dateOfBirth: '',
        educationLevel: '',
        email: '',
        phoneNumber: '+989120000000',
        country: '',
        city: '',
        statusMessage: 'Your account is ready, you can now apply for.',
        skills: ['JavaScript', 'Vue.js'],
        interests: ['Photography', 'Traveling'],
        experience: [
          { jobTitle: 'Frontend Developer', company: 'Tech Corp', from: '2020-01-01', to: '2022-12-31' },
        ],
        projects: [
          { name: 'ChatApp', githubLink: 'https://github.com/user/chatapp', techStack: 'Vue.js, Node.js', teamMembers: 'Alice, Bob' },
        ],
      },
    };
  },
};
</script>

<style scoped>
.visitor-profile-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 12rem;
  padding-right: 3rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.sidebar-nav {
  width: 80px;
  background-color: #f7fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

.logo img {
  width: 40px;
  height: 40px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

nav ul li {
  margin: 1rem 0;
}

nav ul li a {
  display: block;
  padding: 0.5rem;
}

nav ul li a img {
  width: 24px;
  height: 24px;
}

nav ul li a.active {
  background-color: #e2e8f0;
  border-radius: 8px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #41b883;
  border-radius: 100px;
  margin-bottom: 3rem;
  margin-right: 3rem;
  width: 110rem;
  height: 11rem;
}

.avatar {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info h1 {
  font-size: 2rem;
  /* Larger headline */
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  /* Subtle text shadow */
}

.user-info p {
  color: #e6fffb;
  /* Lighter text color for contrast */
  font-size: 1.1rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.profile-details {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  /* Larger radius for a modern feel */
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  /* Softer shadow */
  margin-right: 3rem;
  margin-bottom: 3rem;
  max-width: 120rem;
  /* Consistent width with header */
}

.section {
  margin-bottom: 2.5rem;
  /* Increased spacing between sections */
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  /* Subtle divider */
}

.section:last-child {
  border-bottom: none;
  /* Remove divider from last section */
  margin-bottom: 0;
}

.section h2 {
  font-size: 1.5rem;
  /* Larger section titles */
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
}

.section h2::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #41b883;
  transition: width 0.3s ease;
}

.section:hover h2::after {
  width: 100px;
  /* Expand underline on hover for interactivity */
}

.section p,
.section ul {
  font-size: 1rem;
  /* Slightly larger text for readability */
  color: #34495e;
  margin: 0.75rem 0;
  line-height: 1.6;
  /* Better line spacing */
}

.section ul {
  list-style: disc;
  padding-left: 2rem;
}

.experience-item,
.project-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fbfb;
  border-radius: 8px;
  border-left: 4px solid #41b883;
  /* Highlighted border */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.experience-item:hover,
.project-item:hover {
  transform: translateX(10px);
  /* Slight shift on hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-item a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: 500;
}

.project-item a:hover {
  text-decoration: underline;
  color: #27ae60;
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

@media (max-width: 1200px) {
  .main-content {
    padding-left: 6rem;
  }

  .profile-header {
    width: 100%;
    max-width: 90rem;
    height: 10rem;
  }

  .avatar {
    width: 140px;
    height: 140px;
  }

  .user-info h1 {
    font-size: 1.75rem;
  }

  .user-info p {
    font-size: 1rem;
  }

  .profile-details {
    max-width: 90rem;
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    height: auto;
    padding: 1rem;
  }

  .avatar {
    margin-bottom: 1rem;
  }

  .main-content {
    padding-left: 2rem;
  }

  .profile-details {
    padding: 1rem;
    margin-right: 1rem;
  }
}
</style>

<template>
  <div class="edit-profile-container">
    <div class="main-content">
      <header>
        <h1>Settings</h1>
        <div class="user-menu">
          <img src="@/assets/images/avatar.jpg" alt="User Avatar" /> <!-- Replace with user avatar -->
        </div>
      </header>

      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-header">
          <img src="@/assets/images/avatar.jpg" alt="User Avatar" class="avatar" />
          <div class="user-info">
            <h2>{{ user.firstName }} {{ user.surname }}</h2>
            <p>{{ user.statusMessage }}</p>
          </div>
        </div>


        <!-- Tab Content -->
        <div class="edit-profile-tabs">
          <!-- Tab Headers -->
          <div class="tab-headers">
            <div class="tab-header" :class="{ active: activeTab === 'Personal' }" @click="activeTab = 'Personal'">
              Personal
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Contact' }" @click="activeTab = 'Contact'">
              Contact
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Skills' }" @click="activeTab = 'Skills'">
              Skills
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Interests' }" @click="activeTab = 'Interests'">
              Interests
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Experience' }" @click="activeTab = 'Experience'">
              Experience
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Projects' }" @click="activeTab = 'Projects'">
              Projects
            </div>
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Personal'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Personal</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label>First Name</label>
                    <input v-model="user.firstName" placeholder="Enter Value" />
                  </div>
                  <div class="form-group">
                    <label>Surname</label>
                    <input v-model="user.surname" placeholder="Enter Value" />
                  </div>
                </div>
                <div class="form-group">
                  <label>About</label>
                  <input v-model="user.statusMessage" placeholder="Enter Value" />
                </div>
                <div class="form-group">
                  <label for="dob">Date of Birth</label>
                  <input id="dob" v-model="user.dateOfBirth" type="date" class="form-control"
                    placeholder="Enter your date of birth" />
                </div>
                <div class="form-group">
                  <label>Education Level</label>
                  <select v-model="user.educationLevel">
                    <option disabled value="">Select</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Contact'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Contact</h4>
                <div class="form-group">
                  <label>Email</label>
                  <input v-model="user.email" placeholder="Enter Value" />
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input v-model="user.phoneNumber" placeholder="Enter Value" />
                </div>
                <div class="form-group">
                  <label>Country</label>
                  <select v-model="user.country">
                    <option disabled value="">Select</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Iran">Iran</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>City</label>
                  <select v-model="user.city">
                    <option disabled value="">Select</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Skills'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Skills</h4>
                <div class="form-group">
                  <label>Add Skill</label>
                  <input v-model="newSkill" placeholder="Enter a skill" />
                  <button type="button" @click="addSkill" class="add-skill-btn">Add</button>
                </div>
                <div class="form-group skills-list">
                  <label>Current Skills</label>
                  <div v-for="(skill, index) in user.skills" :key="index" class="skill-item">
                    {{ skill }}
                    <button @click="removeSkill(index)" class="remove-skill-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Interests'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Interests</h4>
                <div class="form-group">
                  <label>Add Interest</label>
                  <input v-model="newInterest" placeholder="Enter an interest" />
                  <button type="button" @click="addInterest" class="add-interest-btn">Add</button>
                </div>
                <div class="form-group interests-list">
                  <label>Current Interests</label>
                  <div v-for="(interest, index) in user.interests" :key="index" class="interest-item">
                    {{ interest }}
                    <button @click="removeInterest(index)" class="remove-interest-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Experience'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Experience</h4>
                <div class="form-group">
                  <label>Job Title</label>
                  <input v-model="newExperience.jobTitle" placeholder="Enter job title" />
                </div>
                <div class="form-group">
                  <label>Company</label>
                  <input v-model="newExperience.company" placeholder="Enter company name" />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>From</label>
                    <input v-model="newExperience.from" type="date" placeholder="Start date" />
                  </div>
                  <div class="form-group">
                    <label>To</label>
                    <input v-model="newExperience.to" type="date" placeholder="End date" />
                  </div>
                </div>
                <button type="button" @click="addExperience" class="add-experience-btn">Add</button>
                <div class="form-group experience-list">
                  <label>Work Experience</label>
                  <div v-for="(exp, index) in user.experience" :key="index" class="experience-item">
                    <div>
                      <strong>{{ exp.jobTitle }}</strong> at {{ exp.company }} ({{ exp.from }} - {{ exp.to }})
                    </div>
                    <button @click="removeExperience(index)" class="remove-experience-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Projects'">
              <h3>Edit Profile</h3>
              <p class="last-update">Last Update August 1</p>
              <div class="form-section">
                <h4>Projects</h4>
                <div class="form-group">
                  <label>Project Name</label>
                  <input v-model="newProject.name" placeholder="Enter project name" />
                </div>
                <div class="form-group">
                  <label>GitHub Link</label>
                  <input v-model="newProject.githubLink" placeholder="Enter GitHub link" type="url" />
                </div>
                <div class="form-group">
                  <label>Tech Stack</label>
                  <input v-model="newProject.techStack" placeholder="Enter tech stack (e.g., Vue.js, Node.js)" />
                </div>
                <div class="form-group">
                  <label>Team Members</label>
                  <input v-model="newProject.teamMembers" placeholder="Enter team members (comma-separated)" />
                </div>
                <button type="button" @click="addProject" class="add-project-btn">Add</button>
                <div class="form-group project-list">
                  <label>Current Projects</label>
                  <div v-for="(project, index) in user.projects" :key="index" class="project-item">
                    <div>
                      <strong>{{ project.name }}</strong><br />
                      GitHub: <a :href="project.githubLink" target="_blank">{{ project.githubLink }}</a><br />
                      Tech Stack: {{ project.techStack }}<br />
                      Team Members: {{ project.teamMembers }}
                    </div>
                    <button @click="removeProject(index)" class="remove-project-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
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
      cities: [],
      availableCities: {
        USA: ['New York', 'Los Angeles', 'Chicago'],
        Canada: ['Toronto', 'Vancouver', 'Montreal'],
        Iran: ['Tehran', 'Shiraz', 'Isfahan'],
      },
      newSkill: '',
      newInterest: '',
      newExperience: { jobTitle: '', company: '', from: '', to: '' },
      newProject: { name: '', githubLink: '', techStack: '', teamMembers: '' },
      activeTab: 'Personal',
    };
  },
  watch: {
    'user.country'(newCountry) {
      this.cities = this.availableCities[newCountry] || [];
      this.user.city = '';
    },
  },
  methods: {
    saveProfile() {
      console.log('Profile saved:', this.user);
      alert('Profile saved successfully!');
    },
    addSkill() {
      if (this.newSkill.trim() && !this.user.skills.includes(this.newSkill.trim())) {
        this.user.skills.push(this.newSkill.trim());
        this.newSkill = '';
      }
    },
    removeSkill(index) {
      this.user.skills.splice(index, 1);
    },
    addInterest() {
      if (this.newInterest.trim() && !this.user.interests.includes(this.newInterest.trim())) {
        this.user.interests.push(this.newInterest.trim());
        this.newInterest = '';
      }
    },
    removeInterest(index) {
      this.user.interests.splice(index, 1);
    },
    addExperience() {
      if (
        this.newExperience.jobTitle.trim() &&
        this.newExperience.company.trim() &&
        this.newExperience.from.trim() &&
        this.newExperience.to.trim()
      ) {
        this.user.experience.push({ ...this.newExperience });
        this.newExperience = { jobTitle: '', company: '', from: '', to: '' };
      }
    },
    removeExperience(index) {
      this.user.experience.splice(index, 1);
    },
    addProject() {
      if (
        this.newProject.name.trim() &&
        this.newProject.githubLink.trim() &&
        this.newProject.techStack.trim() &&
        this.newProject.teamMembers.trim()
      ) {
        this.user.projects.push({ ...this.newProject });
        this.newProject = { name: '', githubLink: '', techStack: '', teamMembers: '' };
      }
    },
    removeProject(index) {
      this.user.projects.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* --------------------------------------
   Container and Layout
-------------------------------------- */
.edit-profile-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.profile-section {
  flex: 1;
  padding-left: 8rem;
  overflow-y: auto;
}

/* --------------------------------------
   Sidebar Navigation
-------------------------------------- */
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

/* --------------------------------------
   Header Section
-------------------------------------- */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-size: contain;
}

header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 8rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-menu img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

/* --------------------------------------
   Profile Header
-------------------------------------- */
.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #41b883;
  border-radius: 100px;
  margin-bottom: 3rem;
  width: 110rem;
  height: 11rem;
}

.avatar {
  width: 170px;
  height: 170px;
    border-radius: 50%;
    object-fit: cover;
  }

.upload-btn {
  position: relative;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  background-color: #48bb78;
  border-radius: 50%;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
}

/* --------------------------------------
   Edit Profile Tabs
-------------------------------------- */
.edit-profile-tabs {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.tab-headers {
  display: flex;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.tab-header {
  padding: 0.5rem 1rem;
  background-color: #e6f0fa;
  border: 1px solid #b3d4fc;
  border-radius: 5px 5px 0 0;
  margin-right: -1px;
  /* Overlap effect */
  color: #2d3748;
  font-weight: 600;
  cursor: pointer;
}

.tab-header.active {
  background-color: #fff;
  border-bottom: 1px solid #fff;
  z-index: 2;
}

.tab-content {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0 5px 5px 5px;
}

/* --------------------------------------
   Form Sections and Inputs
-------------------------------------- */
.edit-profile-form {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.edit-profile-form h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.last-update {
  color: #a0aec0;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.875rem;
}

/* --------------------------------------
   Skills Section
-------------------------------------- */
.skills-list {
  margin-top: 0.5rem;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.add-skill-btn {
  background-color: #41b883;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: 8px;
  font-size: 0.875rem;
}

.add-skill-btn:hover {
  background-color: #41b883;
}

.remove-skill-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-skill-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Interests Section
-------------------------------------- */
.interests-list {
  margin-top: 0.5rem;
}

.interest-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.add-interest-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: 5px;
  font-size: 0.875rem;
}

.add-interest-btn:hover {
  background-color: #41b883;
}

.remove-interest-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-interest-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Experience Section
-------------------------------------- */
.experience-list {
  margin-top: 0.5rem;
}

.experience-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.add-experience-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-experience-btn:hover {
  background-color: #41b883;
}

.remove-experience-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-experience-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Projects Section
-------------------------------------- */
.project-list {
  margin-top: 0.5rem;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.project-item a {
  color: #48bb78;
  text-decoration: none;
}

.project-item a:hover {
  text-decoration: underline;
}

.add-project-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-project-btn:hover {
  background-color: #41b883;
}

.remove-project-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-project-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Save Button
-------------------------------------- */
.save-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.save-btn:hover {
  background-color: #72cba4;
}

/* --------------------------------------
   Scrollbar Customization
-------------------------------------- */
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

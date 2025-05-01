<template>
  <div class="edit-profile-container">
    <div class="main-content">
      <header>
        <h1>Settings</h1>
      </header>

      <div class="profile-section">
        <div class="profile-header">
          <img :src="user.avatar" alt="User Avatar" class="avatar" />
          <div class="user-info">
            <h2>{{ user.name }}</h2>
            <p>{{ user.role }}</p>
            <p>{{ user.bio }}</p>
          </div>
        </div>

        <div class="edit-profile-tabs">
          <div class="tab-headers">
            <div class="tab-header" :class="{ active: activeTab === 'Personal' }" @click="activeTab = 'Personal'">
              Personal
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Contact' }" @click="activeTab = 'Contact'">
              Contact
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'Account' }" @click="activeTab = 'Account'">
              Account
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
            <div class="tab-header" :class="{ active: activeTab === 'Education' }" @click="activeTab = 'Education'">
              Education
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'SocialLinks' }" @click="activeTab = 'SocialLinks'">
              Social Links
            </div>
            <div class="tab-header" :class="{ active: activeTab === 'CodingRanks' }" @click="activeTab = 'CodingRanks'">
              Coding Ranks
            </div>
          </div>


          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Personal Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Personal'">
              <h3>Edit Profile</h3>

              <div class="form-section">
                <h4>Personal</h4>
                <div class="form-group">
                  <label>Name</label>
                  <input v-model="user.name" placeholder="Enter your name" required />
                </div>
                <div class="form-group">
                  <label>Bio</label>
                  <input v-model="user.bio" placeholder="Tell us about yourself" />
                </div>
                <div class="form-group">
                  <label>Age</label>
                  <input v-model.number="user.age" type="number" placeholder="Enter your age" />
                </div>
                <div class="form-group">
                  <label>Gender</label>
                  <select v-model="user.gender">
                    <option disabled value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Location</label>
                  <input v-model="user.location" placeholder="Enter your location" />
                </div>
                <div class="form-group">
                  <label>Role</label>
                  <select v-model="user.role" required>
                    <option disabled value="">Select</option>
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group" v-if="user.role === 'Student'">
                  <label>Current College Year</label>
                  <input v-model.number="user.currentCollegeYear" type="number"
                    placeholder="Enter your current college year" />
                </div>
                <div class="form-group">
                  <label>Availability</label>
                  <select v-model="user.availability">
                    <option disabled value="">Select</option>
                    <option value="openToJoin">Open to Join</option>
                    <option value="NotAvailaible">Not Available</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Contact Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Contact'">
              <h3>Edit Profile</h3>

              <div class="form-section">
                <h4>Contact</h4>
                <div class="form-group">
                  <label>Email</label>
                  <input v-model="user.email" placeholder="Enter your email" required />
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input v-model="user.phoneNumber" placeholder="Enter your phone number" />
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Account Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Account'">
              <h3>Edit Account</h3>

              <div class="form-section">
                <h4>Account Settings</h4>
                <div class="form-group">
                  <label>Password</label>
                  <input v-model="user.password" type="password" placeholder="Enter new password" required />
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Skills Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Skills'">
              <h3>Edit Profile</h3>

              <div class="form-section">
                <h4>Skills</h4>
                <div class="form-group">
                  <label>Skill Category</label>
                  <input v-model="newSkillCategory" placeholder="Enter skill category (e.g., Frontend)" />
                </div>
                <div class="form-group">
                  <label>Add Skill</label>
                  <input v-model="newSkill" placeholder="Enter a skill (e.g., React)" />
                  <button type="button" @click="addSkill" class="add-skill-btn">Add</button>
                </div>
                <div class="form-group skills-list">
                  <label>Current Skills</label>
                  <div v-for="(skillEntry, index) in user.userSkills" :key="index" class="skill-item">
                    <div>
                      <strong>{{ skillEntry.category }}:</strong> {{ skillEntry.skill.join(', ') }}
                    </div>
                    <button @click="removeSkill(index)" class="remove-skill-btn">×</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Add Field of Expertise</label>
                  <input v-model="newFieldOfExpertise" placeholder="Enter a field (e.g., Web Development)" />
                  <button type="button" @click="addFieldOfExpertise" class="add-field-btn">Add</button>
                </div>
                <div class="form-group expertise-list">
                  <label>Current Fields of Expertise</label>
                  <div v-for="(field, index) in user.fieldOfExpertise" :key="index" class="expertise-item">
                    {{ field }}
                    <button @click="removeFieldOfExpertise(index)" class="remove-expertise-btn">×</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Coding Level</label>
                  <select v-model="user.codingLevel">
                    <option disabled value="">Select</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Interests Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Interests'">
              <h3>Edit Profile</h3>

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

            <!-- Experience Tab -->

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Experience'">
              <h3>Edit Profile</h3>
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

            <!-- Projects Tab -->

            <form @submit.prevent="saveProfile" v-if="activeTab === 'Projects'">
              <h3>Edit Profile</h3>
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

            <!-- Education Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'Education'">
              <h3>Edit Profile</h3>

              <div class="form-section">
                <h4>Education</h4>
                <div class="form-group">
                  <label>Institution</label>
                  <input v-model="newEducation.institution" placeholder="Enter institution name" />
                </div>
                <div class="form-group">
                  <label>Degree Type</label>
                  <select v-model="newEducation.degreeType">
                    <option disabled value="">Select</option>
                    <option value="High School">High School</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Course</label>
                  <input v-model="newEducation.course" placeholder="Enter course (e.g., Computer Science)" />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Start Year</label>
                    <input v-model.number="newEducation.startYear" type="number" placeholder="Start year" />
                  </div>
                  <div class="form-group">
                    <label>Year of Completion</label>
                    <input v-model.number="newEducation.yearOfCompletion" type="number" placeholder="End year" />
                  </div>
                </div>
                <button type="button" @click="addEducation" class="add-education-btn">Add</button>
                <div class="form-group education-list">
                  <label>Education History</label>
                  <div v-for="(edu, index) in user.education" :key="index" class="education-item">
                    <div>
                      <strong>{{ edu.degreeType }}</strong> in {{ edu.course }} at {{ edu.institution }} ({{
                      edu.startYear }} - {{ edu.yearOfCompletion }})
                    </div>
                    <button @click="removeEducation(index)" class="remove-education-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Social Links Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'SocialLinks'">
              <h3>Edit Profile</h3>

              <div class="form-section">
                <h4>Social Links</h4>
                <div class="form-group">
                  <label>LinkedIn</label>
                  <input v-model="user.socialLinks.linkedin" placeholder="Enter LinkedIn URL" type="url" />
                </div>
                <div class="form-group">
                  <label>GitHub</label>
                  <input v-model="user.socialLinks.github" placeholder="Enter GitHub URL" type="url" />
                </div>
                <div class="form-group">
                  <label>Add Other Social Link</label>
                  <input v-model="newSocialLink.platform" placeholder="Enter platform (e.g., Twitter)" />
                  <input v-model="newSocialLink.link" placeholder="Enter link" type="url" />
                  <button type="button" @click="addSocialLink" class="add-social-btn">Add</button>
                </div>
                <div class="form-group social-links-list">
                  <label>Other Social Links</label>
                  <div v-for="(link, index) in user.socialLinks.Others" :key="index" class="social-link-item">
                    <div>
                      {{ link.platform }}: <a :href="link.link" target="_blank">{{ link.link }}</a>
                    </div>
                    <button @click="removeSocialLink(index)" class="remove-social-link-btn">×</button>
                  </div>
                </div>
              </div>
              <button type="submit" class="save-btn">Save</button>
            </form>

            <!-- Coding Ranks Tab -->
            <form @submit.prevent="saveProfile" v-if="activeTab === 'CodingRanks'">
              <h3>Edit Profile</h3>
              <div class="form-section">
                <h4>Coding Ranks</h4>
                <div class="form-group">
                  <label>Platform</label>
                  <input v-model="newCodingRank.platform" placeholder="Enter platform (e.g., LeetCode)" />
                </div>
                <div class="form-group">
                  <label>Rank</label>
                  <input v-model.number="newCodingRank.rank" type="number" placeholder="Enter rank" />
                </div>
                <div class="form-group">
                  <label>Profile Link</label>
                  <input v-model="newCodingRank.profileLink" placeholder="Enter profile link" type="url" />
                </div>
                <button type="button" @click="addCodingRank" class="add-coding-rank-btn">Add</button>
                <div class="form-group coding-ranks-list">
                  <label>Current Coding Ranks</label>
                  <div v-for="(rank, index) in user.codingRanks" :key="index" class="coding-rank-item">
                    <div>
                      <strong>{{ rank.platform }}:</strong> Rank {{ rank.rank }} (<a :href="rank.profileLink"
                        target="_blank">{{ rank.profileLink }}</a>)
                    </div>
                    <button @click="removeCodingRank(index)" class="remove-coding-rank-btn">×</button>
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
import avatarImage from '@/assets/images/avatar.jpg';

export default {
  name: 'EditProfile',
  data() {
    return {
      user: {
        name: 'Mobina Mirbagheri',
        email: '',
        avatar: avatarImage,
        password: '',
        age: null,
        bio: 'Your account is ready, you can now apply for.',
        gender: '',
        location: '',
        role: 'Student',
        fieldOfExpertise: [],
        userSkills: [],
        codingRanks: [],
        codingLevel: '',
        interests: ['Photography', 'Traveling'],
        experience: [
          { jobTitle: 'Frontend Developer', company: 'Tech Corp', from: '2020-01-01', to: '2022-12-31' },
        ],
        projects: [
          { name: 'ChatApp', githubLink: 'https://github.com/user/chatapp', techStack: 'Vue.js, Node.js', teamMembers: 'Alice, Bob' },
        ],
        education: [],
        currentCollegeYear: null,
        availability: '',
        socialLinks: {
          linkedin: '',
          github: '',
          Others: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      cities: [],
      availableCities: {
        USA: ['New York', 'Los Angeles', 'Chicago'],
        Canada: ['Toronto', 'Vancouver', 'Montreal'],
        Iran: ['Tehran', 'Shiraz', 'Isfahan'],
      },
      newSkillCategory: '',
      newSkill: '',
      newFieldOfExpertise: '',
      newExperience: { jobTitle: '', company: '', from: '', to: '' },
      newProject: { name: '', githubLink: '', techStack: '', teamMembers: '' },
      newInterest: '',
      newEducation: { institution: '', degreeType: '', course: '', startYear: null, yearOfCompletion: null },
      newSocialLink: { platform: '', link: '' },
      newCodingRank: { platform: '', rank: null, profileLink: '' },
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
      if (this.newSkillCategory.trim() && this.newSkill.trim()) {
        const existingCategory = this.user.userSkills.find(skillEntry => skillEntry.category === this.newSkillCategory.trim());
        if (existingCategory) {
          if (!existingCategory.skill.includes(this.newSkill.trim())) {
            existingCategory.skill.push(this.newSkill.trim());
          }
        } else {
          this.user.userSkills.push({
            category: this.newSkillCategory.trim(),
            skill: [this.newSkill.trim()],
          });
        }
        this.newSkillCategory = '';
        this.newSkill = '';
      }
    },
    removeSkill(index) {
      this.user.userSkills.splice(index, 1);
    },
    addFieldOfExpertise() {
      if (this.newFieldOfExpertise.trim() && !this.user.fieldOfExpertise.includes(this.newFieldOfExpertise.trim())) {
        this.user.fieldOfExpertise.push(this.newFieldOfExpertise.trim());
        this.newFieldOfExpertise = '';
      }
    },
    removeFieldOfExpertise(index) {
      this.user.fieldOfExpertise.splice(index, 1);
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
    addEducation() {
      if (
        this.newEducation.institution.trim() &&
        this.newEducation.degreeType &&
        this.newEducation.course.trim() &&
        this.newEducation.startYear &&
        this.newEducation.yearOfCompletion
      ) {
        this.user.education.push({ ...this.newEducation });
        this.newEducation = { institution: '', degreeType: '', course: '', startYear: null, yearOfCompletion: null };
      }
    },
    removeEducation(index) {
      this.user.education.splice(index, 1);
    },
    addSocialLink() {
      if (this.newSocialLink.platform.trim() && this.newSocialLink.link.trim()) {
        this.user.socialLinks.Others.push({ ...this.newSocialLink });
        this.newSocialLink = { platform: '', link: '' };
      }
    },
    removeSocialLink(index) {
      this.user.socialLinks.Others.splice(index, 1);
    },
    addCodingRank() {
      if (this.newCodingRank.platform.trim() && this.newCodingRank.rank !== null && this.newCodingRank.profileLink.trim()) {
        this.user.codingRanks.push({ ...this.newCodingRank });
        this.newCodingRank = { platform: '', rank: null, profileLink: '' };
      }
    },
    removeCodingRank(index) {
      this.user.codingRanks.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* --------------------------------------
   Education Section
-------------------------------------- */
.education-list {
  margin-top: 0.5rem;
}

.education-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.add-education-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-education-btn:hover {
  background-color: #41b883;
}

.remove-education-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-education-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Fields of Expertise Section
-------------------------------------- */
.expertise-list {
  margin-top: 0.5rem;
}

.expertise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.add-field-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-field-btn:hover {
  background-color: #41b883;
}

.remove-expertise-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-expertise-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Social Links Section
-------------------------------------- */
.social-links-list {
  margin-top: 0.5rem;
}

.social-link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.social-link-item a {
  color: #48bb78;
  text-decoration: none;
}

.social-link-item a:hover {
  text-decoration: underline;
}

.add-social-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-social-btn:hover {
  background-color: #41b883;
}

.remove-social-link-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-social-link-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Coding Ranks Section
-------------------------------------- */
.coding-ranks-list {
  margin-top: 0.5rem;
}

.coding-rank-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.coding-rank-item a {
  color: #48bb78;
  text-decoration: none;
}

.coding-rank-item a:hover {
  text-decoration: underline;
}

.add-coding-rank-btn {
  background-color: #48bb78;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.add-coding-rank-btn:hover {
  background-color: #41b883;
}

.remove-coding-rank-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.remove-coding-rank-btn:hover {
  color: #e53e3e;
}

/* --------------------------------------
   Container and Layout
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
  flex-wrap: nowrap;
  /* Prevent wrapping */
  overflow-x: auto;
  /* Allow horizontal scrolling if needed */
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  gap: 0.25rem;
  /* Add small gap between tabs */
  padding-bottom: 1px;
  /* Ensure border alignment */
}

.tab-header {
  flex: 0 0 auto;
  /* Prevent shrinking/stretching */
  padding: 0.75rem 1.5rem;
  /* Increased padding for better click area */
  background-color: #e6f0fa;
  border: 1px solid #b3d4fc;
  border-bottom: none;
  /* Remove bottom border for active effect */
  border-radius: 6px 6px 0 0;
  /* Rounded top corners */
  color: #2d3748;
  font-weight: 600;
  font-size: 0.95rem;
  /* Consistent font size */
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  /* Smooth transitions */
  white-space: nowrap;
  /* Prevent text wrapping */
}

.tab-header:hover {
  background-color: #d1e4ff;
  /* Hover effect */
  color: #1a202c;
  /* Darker text on hover */
}

.tab-header.active {
  background-color: #fff;
  border-bottom: 2px solid #41b883;
  /* Highlight active tab with app's green color */
  color: #41b883;
  /* Active tab text color */
  z-index: 2;
}

.tab-content {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0 6px 6px 6px;
  /* Rounded corners except top */
  background-color: #fff;
}

.tab-headers::-webkit-scrollbar {
  height: 6px;
}

.tab-headers::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 10px;
}

.tab-headers::-webkit-scrollbar-thumb {
  background-color: #72cba4;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.tab-headers::-webkit-scrollbar-thumb:hover {
  background-color: #5bb688;
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
  padding-left: 8rem;
}

.profile-section {
  padding-left: 8rem;
  flex: 1;
  overflow-y: auto;
}

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

.upload-btn img {
  width: 16px;
  height: 16px;
}

.user-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.user-info p {
  color: #ffffff;
}

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

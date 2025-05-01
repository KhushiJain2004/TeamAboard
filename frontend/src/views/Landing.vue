<template>
  <div class="business-deal-container">
    <div class="background-blur"></div>
    <div class="content-wrapper" v-scroll-reveal="{ origin: 'bottom', distance: '40px', duration: 1000, delay: 100 }">
      <div class="text-section">
        <h1 class="title">Your Collaborative HUB</h1>
        <p class="description">
          Ignite your learning with our innovative educational social media platform. We are more than just a network;
          we are your committed partner for growth. We provide you with the essential resources to thrive: connect with
          inspiring mentors, discover transformative internships, participate in motivating competitions, and access
          informative blogs. Our platform fosters a collaborative environment where you can collaborate on projects,
          learn from a supportive community, and grow towards your educational aspirations. Together, we are building
          the future of learning.
        </p>
        <div class="cta-buttons">
          <router-link to="/login" class="cta-button">
            <i class="fas fa-user-tie"></i> Mentors <span class="arrow">→</span>
          </router-link>
          <router-link to="/login" class="cta-button">
            <i class="fas fa-briefcase"></i> Internships <span class="arrow">→</span>
          </router-link>
          <router-link to="/login" class="cta-button">
            <i class="fas fa-trophy"></i> Competitions <span class="arrow">→</span>
          </router-link>
          <router-link to="/login" class="cta-button">
            <i class="fas fa-blog"></i> Blogs <span class="arrow">→</span>
          </router-link>
          <router-link to="/login" class="cta-button">
            <i class="fas fa-blog"></i> More <span class="arrow">→</span>
          </router-link>
          <router-link to="/login" class="cta-button1">
            <i class="fas fa-blog"></i> Login <span class="arrow">→</span>
          </router-link>
        </div>
      </div>
      <div class="image-section">
        <img :src="businessPeopleImage" alt="Business deal" class="business-img" />
      </div>
    </div>
  </div>
</template>



<script>
import businessPeopleImage from '@/assets/images/home.png';
import ScrollReveal from 'scrollreveal';

export default {
  name: 'LandingPage',
  data() {
    return {
      businessPeopleImage
    };
  },
  mounted() {
    ScrollReveal().reveal('.content-wrapper', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out'
    });
  }
};
</script>


<style scoped>
.business-deal-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* Removed pointer-events: none */
}

.background-blur {
  position: absolute;
  top: 20%;
  left: 60%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(36, 173, 106, 0.3), transparent 70%);
  filter: blur(100px);
  z-index: 0;
  /* Removed pointer-events: none */
}

.content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.text-section {
  flex: 1 1 500px;
}

.title {
  font-size: 52px;
  font-weight: 800;
  color: #0C502C;
  margin-bottom: 20px;
  line-height: 1.2;
}

.description {
  font-size: 18px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cta-button1 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #24AD6A, #1C8C55);
  color: white;
  font-size: 16px;
  padding: 12px 28px;
  border-radius: 40px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  /* Added explicit pointer-events */
  pointer-events: auto;
}

.cta-button1 {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #ff3636, #be0000);
  color: white;
  font-size: 16px;
  padding: 12px 28px;
  border-radius: 40px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
}

.cta-button i {
  font-size: 16px;
}

.cta-button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #1C8C55, #157245);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.cta-button1:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #ff3636,
      #be0000);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.arrow {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

.image-section {
  flex: 1 1 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.business-img {
  max-width: 130%;
  height: auto;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .title {
    font-size: 36px;
  }

  .description {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

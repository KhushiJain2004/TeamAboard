<template>
  <div :class="isLoggedIn ? 'app-background' : 'no-background'">
    <!-- Intro Screen -->
    <IntroScreen v-if="!introFinished" @beginHunt="introFinished = true" />

    <!-- Auth Forms & Main App -->
    <template v-else>
      <Navbar v-if="isLoggedIn" @logout="handleLogout" />
      <div v-if="!isLoggedIn">
        <LoginForm
          v-if="showLogin"
          @switchToRegister="showLogin = false"
          @loginSuccess="handleLoginSuccess"
        />
        <RegisterForm
          v-else
          @switchToLogin="showLogin = true"
          @registerSuccess="handleLoginSuccess"
        />
      </div>

      <!-- Main Content After Login -->
      <div v-else class="main-content">
        <h1>Welcome to the Main App!</h1>
        <p>Enjoy exploring the features 🔥</p>
      </div>
    </template>
  </div>
</template>

<script>
import IntroScreen from './components/IntroScreen.vue'
import LoginForm from './components/LoginForm.vue'
import Navbar from './components/NavBar.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    IntroScreen,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      introFinished: false,
      isLoggedIn: false,
      showLogin: true,
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true
    },
    handleLogout() {
      this.isLoggedIn = false
      this.introFinished = false
      this.showLogin = true
    },
  },
}
</script>

<style src="./assets/styles.css"></style>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" placeholder="Enter username" required />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Enter password" required />
      </div>

      <button type="submit" class="login-btn">Login</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="switch-text">
        Don't have an account?
        <span class="switch-link" @click="$emit('switchToRegister')">Register</span>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['loginSuccess'])
const username = ref('')
const password = ref('')
const errorMessage = ref('')

// Dummy credentials
const validUsername = 'admin'
const validPassword = '1234'

// Login Handler
function handleLogin() {
  if (username.value === validUsername && password.value === validPassword) {
    emit('loginSuccess') // Emit login success event
  } else {
    errorMessage.value = 'Invalid username or password. Try again!'
  }
}
</script>

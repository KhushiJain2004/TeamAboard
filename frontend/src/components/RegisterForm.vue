<template>
  <div class="login-container">
    <h2>Create Account</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Full Name" required />
      <input v-model="email" type="email" placeholder="Email Address" required />
      <input v-model="password" type="password" placeholder="Create Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />

      <button type="submit">Register</button>

      <p>Already have an account?</p>
      <button @click.prevent="$emit('switchToLogin')" class="new-participation-btn">
        Back to Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    handleRegister() {
      if (this.password === this.confirmPassword) {
        console.log('Registration Successful:', this.name, this.email)
      } else {
        alert("Passwords don't match!")
      }
    },
  },
}
</script>

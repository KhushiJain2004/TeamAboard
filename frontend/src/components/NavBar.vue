<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <div class="navbar-left">
      <!-- <div class="logo">un<span class="highlight">stop</span></div> -->
      <input type="text" class="search-bar" placeholder="Search Opportunities" />
    </div>

    <ul class="nav-links">
      <li>Internships</li>
      <li>Jobs</li>
      <li>Competitions</li>
      <li>Mentorships</li>
      <li>Practice</li>
      <li class="dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        More
        <ul v-if="showDropdown" class="dropdown-menu">
          <li>Courses</li>
          <li>Scholarships</li>
          <li>Cultural Events</li>
          <li>Workshops</li>
          <li>Conferences</li>
          <li>Blog</li>
        </ul>
      </li>
    </ul>

    <div class="navbar-right">
      <button class="host-btn">+ Host</button>
      <button class="business-btn">For Business</button>
      <i class="icon">🔔</i>
      <!-- Notification Icon -->
      <i class="icon">👤</i>
      <!-- Profile Icon -->
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/Navbar.css' // Import external CSS

const showDropdown = ref(false)
</script>

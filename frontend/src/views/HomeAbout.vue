<template>
  <div class="bg-teal-500 min-h-screen flex items-center justify-center">
    <div class="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto p-6">
      <!-- Text Section -->
      <div class="bg-white rounded-lg p-8 shadow-lg text-center md:text-left">
        <h1 class="text-4xl font-bold text-teal-900 mb-4">Business Deal</h1>
        <p class="text-gray-700 mb-6">
          Connect with partners and seal the deal! Our platform makes business collaborations seamless and efficient.
        </p>
        <button @click="getStarted"
          class="bg-teal-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300">
          Get Started →
        </button>
      </div>
      <!-- Image Section -->
      <div class="mt-6 md:mt-0 md:ml-8">
        <img src="@/assets/images/home.png" alt="Business Deal Illustration"
          class="w-64 h-64 rounded-lg object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>

const getStarted = () => {
  alert('Starting your business journey!');
  // Add navigation or logic here for your app
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>

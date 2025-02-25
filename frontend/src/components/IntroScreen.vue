<template>
  <div class="intro-screen" :class="{ 'fade-out': startTransition }">
    <div class="intro-text">START WITH YOUR NEW JOURNEY</div>
    <button class="intro-button" @click="startTheHunt">Let's Begin</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['beginHunt'])
const startTransition = ref(false)

function startTheHunt() {
  startTransition.value = true
  setTimeout(() => {
    emit('beginHunt')
  }, 1500) // Wait for the fade-out animation
}
</script>

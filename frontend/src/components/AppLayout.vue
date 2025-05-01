<template>
  <div class="app-layout">
    <Sidebar v-if="!isLoginPage" />
    <div class="main-content" :class="{ 'no-sidebar': isLoginPage }">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
  name: 'AppLayout',
  components: {
    Sidebar,
  },
  computed: {
    isLoginPage() {
      const loginPaths = ['login', 'register', 'recover', 'landing'];
      return loginPaths.includes(this.$route.name);
    },
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow:hidden;
  width: 100%;
  height: 100%;
}

.main-content {
  flex: 1;
  overflow-y: hidden;
}

.main-content.no-sidebar {
  margin-left: 0;
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

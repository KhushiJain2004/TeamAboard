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
      const loginPaths = ['login', 'register', 'recover'];
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
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  min-width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(65, 184, 131, 0.5) 0%,
    rgba(131, 197, 190, 0.5) 100%
  );
}
</style>

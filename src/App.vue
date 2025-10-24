<!-- App.vue -->
<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "./stores/theme";
import { onMounted, watch } from "vue";
import { useAuthStore } from "./stores/auth/auth";
import { useNotificationStore } from "./stores/notification";

const themeStore = useThemeStore();  
const authStore = useAuthStore();
const { user, isAuth } = storeToRefs(authStore);
const notificationStore = useNotificationStore();

watch(
  () => isAuth.value,
  async (newVal) => {
    if (newVal) await notificationStore.fetchLastNotifications();
  }
);
onMounted(async () => {
  // Initialize theme immediately from localStorage (no flicker)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeStore.initTheme(savedTheme);
  }
  
  // Then check auth and apply user's theme if they have one
  await authStore.checkAuth();
  if (user.value?.theme) {
    themeStore.initTheme(user.value.theme);
  }
});
</script>


<style lang="scss">
#app {
  max-width: 100vw;
}

nav {
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

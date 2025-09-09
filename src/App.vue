<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "./stores/theme";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth/auth";

const themeStore = useThemeStore();
const theme = storeToRefs(themeStore);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async () => {
  await authStore.checkAuth();
  if (!user.value) {
    // await authStore.checkAuth();
  }
  themeStore.initTheme(user.value?.theme);
});
</script>


<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  max-width: 100vw;
  // overflow: hidden;
}

nav {
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

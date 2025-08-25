<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "./stores/theme";
import { onMounted } from "vue";

const themeStore = useThemeStore();
const theme = storeToRefs(themeStore);

onMounted(() => {
  themeStore.initTheme();
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

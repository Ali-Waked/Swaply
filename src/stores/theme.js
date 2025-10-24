// stores/theme.js
import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useAuthStore } from "./auth/auth";

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref("light");
  const authStore = useAuthStore();
  const { user, isAuth } = storeToRefs(authStore);

  const themes = [
    {
      label: "فاتح",
      id: "light",
    },
    {
      label: "داكن",
      id: "dark",
    },
  ];

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  };

  const changeTheme = async (value, updateDatabase = false) => {
    const newTheme = value === "dark" ? "dark" : "light";
    currentTheme.value = newTheme;
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Apply CSS classes
    applyTheme(newTheme);
    
    // Update database only if user is authenticated and theme actually changed
    if (updateDatabase && isAuth.value && user.value?.theme !== newTheme) {
      await authStore.update({ theme: newTheme }, false);
    }
  };

  const initTheme = (userTheme) => {
    // Priority: 1. User's saved theme, 2. localStorage, 3. default (light)
    let theme = "light";
    
    if (userTheme) {
      theme = userTheme;
    } else {
      const saved = localStorage.getItem("theme");
      if (saved) {
        theme = saved;
      }
    }
    
    currentTheme.value = theme;
    applyTheme(theme);
  };

  // Watch for theme changes (e.g., from settings page)
  watch(currentTheme, (newVal) => {
    applyTheme(newVal);
  });

  return { currentTheme, themes, changeTheme, initTheme };
});

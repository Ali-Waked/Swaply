// stores/theme.js
import { defineStore, storeToRefs } from "pinia"
import { ref, watch } from "vue"
import { useAuthStore } from "./auth/auth";

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref('light');
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

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

    const changeTheme = async (value) => {
        currentTheme.value = value === "dark" ? "dark" : "light";
        if (user.value.theme !== currentTheme.value)
            await authStore.update({ theme: currentTheme.value });
        localStorage.setItem("theme", currentTheme.value);
    };

    const initTheme = (theme) => {
        if (theme) {
            currentTheme.value = theme;
            return;
        }
        const saved = localStorage.getItem("theme");
        if (saved) {
            currentTheme.value = saved;
        }
    };

    watch(currentTheme, (newVal) => {
        if (newVal == 'dark') {
            document.body.classList.add("dark");
            changeTheme('dark');
        } else {
            document.body.classList.remove("dark");
            changeTheme('light');
        }
    });



    return { currentTheme, themes, changeTheme, initTheme }
})

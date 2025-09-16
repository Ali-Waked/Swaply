// stores/theme.js
import { defineStore, storeToRefs } from "pinia"
import { ref, watch } from "vue"
import { useAuthStore } from "./auth/auth";

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref('light');
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

    const changeTheme = async (value, updateDatabase = false) => {
        currentTheme.value = value === "dark" ? "dark" : "light";
        if (user.value.theme !== currentTheme.value)
            if (updateDatabase)
                await authStore.update({ theme: currentTheme.value }, false);
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
            changeTheme('dark', isAuth.value);
        } else {
            document.body.classList.remove("dark");
            changeTheme('light', isAuth.value);
        }
    });



    return { currentTheme, themes, changeTheme, initTheme }
})

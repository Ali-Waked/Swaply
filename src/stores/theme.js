// stores/theme.js
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref('ligth')

    const themes = [
        {
            label: "فاتح",
            id: "ligth",
        },
        {
            label: "داكن",
            id: "dark",
        },
    ];

    const changeTheme = (value) => {
        currentTheme.value = value === "dark" ? "dark" : "ligth";
        localStorage.setItem("theme", currentTheme.value);
    };

    const initTheme = () => {
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
            changeTheme('ligth');
        }
    });

    return { currentTheme, themes, changeTheme, initTheme }
})

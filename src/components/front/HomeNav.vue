<script setup>
import { mdiWeb } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useThemeStore } from "../../stores/theme";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";

const menuOpen = ref(false);
const langRef = ref(null);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const handleClickOutside = (event) => {
  if (langRef.value && !langRef.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
const router = useRouter();
const themeStore = useThemeStore();
const theme = storeToRefs(themeStore);
const { currentTheme } = theme;
const changeTheme = (value) => {
  themeStore.changeTheme(value);
};
</script>

<template>
  <nav
    class="flex items-center justify-between container mx-auto py-4 dark:bg-gray-800"
  >
    <div class="left flex items-center gap-4">
      <!-- Theme toggle -->
      <div
        class="mode flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        <div
          class="cursor-pointer px-2 py-[6px] rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-transparent"
          @click="changeTheme('ligth')"
        >
          <SunIcon class="w-5 h-5" />
        </div>
        <div
          class="cursor-pointer px-2 py-[6px] rounded-lg text-gray-800 dark:text-gray-200 bg-transparent dark:bg-gray-600"
          @click="changeTheme('dark')"
        >
          <MoonIcon class="w-5 h-5" />
        </div>
      </div>

      <!-- Language button -->
      <div
        ref="langRef"
        class="lang relative cursor-pointer rounded-xl p-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        <MdiIcon
          :icon="mdiWeb"
          class="w-5 h-5 text-gray-600 dark:text-gray-300"
          @click="toggleMenu"
        />

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <ul
            v-if="menuOpen"
            class="absolute text-sm w-44 top-12 right-0 text-nowrap z-50 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800"
          >
            <li
              class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500"
              @click="menuOpen = false"
            >
              اللغة العربية - Arabic
            </li>
            <li
              class="px-4 py-2 cursor-pointer transition-colors hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500"
              @click="menuOpen = false"
            >
              اللغة الانجليزية - English
            </li>
          </ul>
        </transition>
      </div>
    </div>

    <!-- Logo -->
    <div class="logo">
      <img src="../../../public/Logo.png" class="w-28" alt="logo" />
    </div>

    <!-- Right button -->
    <div class="right" @click="router.push({ name: 'login' })">
      <button
        class="transition-colors rounded-lg px-4 py-2 font-[400] text-white bg-blue-600 hover:bg-blue-800 dark:text-gray-200 dark:bg-blue-500 dark:hover:bg-blue-700"
      >
        تسجيل الدخول
      </button>
    </div>
  </nav>
</template>

<!-- <script setup>
import { mdiWeb } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useThemeStore } from "../../stores/theme";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);

const changeTheme = (value) => {
  themeStore.changeTheme(value);
};
</script> -->

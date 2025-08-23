<script setup>
import { mdiWeb } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useThemeStore } from "../../stores/theme";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
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
    class="flex items-center justify-between container mx-auto py-4"
    :class="{
      'bg-gray-800': currentTheme === 'dark',
      'bg-white': currentTheme === 'ligth',
    }"
  >
    <div class="left flex items-center gap-4">
      <!-- Theme toggle -->
      <div
        class="mode flex items-center gap-1 p-1 rounded-lg"
        :class="{
          'bg-gray-700': currentTheme === 'dark',
          'bg-gray-100': currentTheme === 'ligth',
        }"
      >
        <div
          class="cursor-pointer px-2 py-[6px] rounded-lg text-gray-800 dark:text-gray-200"
          :class="{
            'bg-white': currentTheme == 'ligth',
            'bg-transparent': currentTheme == 'dark',
          }"
          @click="changeTheme('ligth')"
        >
          <SunIcon class="w-5 h-5" />
        </div>
        <div
          class="cursor-pointer px-2 py-[6px] rounded-lg text-gray-800 dark:text-gray-200"
          :class="{
            'bg-gray-600': currentTheme == 'dark',
            'bg-transparent': currentTheme == 'ligth',
          }"
          @click="changeTheme('dark')"
        >
          <MoonIcon class="w-5 h-5" />
        </div>
      </div>

      <!-- Language button -->
      <div
        class="lang cursor-pointer rounded-xl p-2"
        :class="{
          'bg-gray-100 text-gray-500': currentTheme === 'ligth',
          'bg-gray-700 text-gray-300': currentTheme === 'dark',
        }"
      >
        <MdiIcon
          :icon="mdiWeb"
          :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'"
        />
      </div>
    </div>

    <!-- Logo -->
    <div class="logo">
      <img src="../../../public/Logo.png" class="w-28" alt="logo" />
    </div>

    <!-- Right button -->
    <div class="right" @click="router.push({ name: 'login' })">
      <button
        class="transition-colors rounded-lg px-4 py-2 font-[400]"
        :class="{
          'text-white bg-blue-600 hover:bg-blue-800': currentTheme === 'ligth',
          'text-gray-200 bg-blue-500 hover:bg-blue-700':
            currentTheme === 'dark',
        }"
      >
        تسجيل الدخول
      </button>
    </div>
  </nav>
</template>
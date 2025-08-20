<script setup>
import { useRouter } from "vue-router";

defineProps({
  title: {
    type: String,
    default: "الملف الشخصي",
  },
  name: {
    type: String,
    default: "personal_profile",
  },
});

const router = useRouter();
</script>
<template>
  <div
    class="cursor-pointer flex flex-col justify-center items-center transition-all p-2 min-w-[70px] sm:w-[120px] font-[300] text-[14px] ml-0"
    style="margin-left: 0"
    @click="router.push({ name: name })"
    :class="{
      'bg-gray-200': router.currentRoute.value.name == name,
      'hover:bg-gray-50 dark:hover:bg-gray-700':
        router.currentRoute.value.name !== name,
    }"
  >
    <span class="relative">
      <slot name="icon" />
    </span>
    <span class="text-[12px]">{{ title }}</span>
  </div>
</template>
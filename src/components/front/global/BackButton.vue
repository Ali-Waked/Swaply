<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  label: {
    type: String,
    default: "الرجوع",
  },
});
</script>

<template>
  <div
    class="back-button flex items-center justify-start cursor-pointer gap-2 mb-4"
  >
    <ArrowRightIcon
      class="w-4 h-4 cursor-pointer hidden lg:block text-black dark:text-white"
    />
    <span class="text-black dark:text-white">{{ label }}</span>
  </div>
</template>
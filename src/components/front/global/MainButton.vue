<script setup >
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="bg-black text-white flex w-full items-center justify-center p-2 rounded-lg transition-all hover:bg-gray-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
  >
    <slot name="icon" />
    <span class="font-[500]">{{ label }}</span>
  </button>
</template>
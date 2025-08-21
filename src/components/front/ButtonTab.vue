<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <button
    class="border-2 flex-1 transition-all font-[400]"
    :class="{
      'bg-gray-900 border-gray-700 text-white dark:bg-gray-100 dark:text-gray-900':
        isActive,
      'border-transparent text-gray-400 dark:text-gray-500': !isActive,
    }"
  >
    {{ label }}
  </button>
</template>
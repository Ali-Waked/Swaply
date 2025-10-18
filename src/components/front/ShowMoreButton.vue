<script setup>
defineProps({
  label: {
    type: String,
    default: "عرض الكل",
  },
});
</script>
<template>
  <button
    class="text-[14px] font-[400] border-2 block border-blue-600 text-blue-600 rounded-lg px-6 py-[6px] transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
    {{ label }}
  </button>
</template>
<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
});
</script>

<template>
  <h3 class="title font-[500] text-[24px] text-black dark:text-white mt-10">
    {{ title }}
  </h3>
  <p class="subtitle font-[400] text-gray-600 mt-1 dark:text-gray-300">
    {{ subtitle }}
  </p>
</template>

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
  <h3 class="title font-[500] text-[24px]">{{ title }}</h3>
  <p class="subtitle font-[400] text-gray-600 mt-1">{{ subtitle }}</p>
</template>
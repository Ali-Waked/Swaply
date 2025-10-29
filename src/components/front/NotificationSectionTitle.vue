<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <h4 class="font-[500] text-blue-600 text-[20px]">{{ title }}</h4>
</template>
<script setup >
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="p-4 rounded-lg bg-amber-100 border border-amber-300">
    <h5 class="title text-amber-600 font-[400] mb-1">{{ title }}</h5>
    <p class="text text-amber-600 text-[14px]">{{ text }}</p>
  </div>
</template>
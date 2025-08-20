<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h3 class="title font-[500] text-[18px]">{{ label }}</h3>
</template>
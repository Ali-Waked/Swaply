<script setup>
const props = defineProps({
  id: String,
  label: String,
});
</script>
<template>
  <label :for="id" class="block font-[400] mb-2 text-black dark:text-white">{{
    label
  }}</label>
</template>
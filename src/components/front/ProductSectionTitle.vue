<script setup>
defineProps({
  title: String,
  icon: [Object, Function],
});
</script>

<template>
  <div class="flex items-center gap-2 text-blue-700 dark:text-blue-400">
    <component :is="icon" class="w-8 h-8" />
    <h3 class="text-[28px] font-[600]">{{ title }}</h3>
  </div>
</template>
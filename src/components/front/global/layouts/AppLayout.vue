<script setup>
import ButtonGroup from "../ButtonGroup.vue";
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto p-2 sm:p-0">
      <ButtonGroup />
      <slot />
    </div>
  </div>
</template>
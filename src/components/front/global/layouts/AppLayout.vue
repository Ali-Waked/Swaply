<script setup>
import ButtonGroup from "../ButtonGroup.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const links = ["personal_profile"];
</script>

<template>
  <div
    class="dark:bg-gray-800"
    :class="{ 'bg-gray-100': !links.includes(router.currentRoute.value.name) }"
  >
    <div class="container mx-auto p-2 sm:p-0">
      <ButtonGroup />
      <slot />
    </div>
  </div>
</template>
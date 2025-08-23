<script setup>
import ButtonGroup from "../ButtonGroup.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const links = ["personal_profile", "home", "search-map", "search-list-stores"];
</script>

<template>
  <div
    class="dark:bg-gray-800"
    :class="{ 'bg-gray-100': !links.includes(router.currentRoute.value.name) }"
  >
    <div
      class="mx-auto p-2 sm:p-0"
      :class="{ container: router.currentRoute.value.name != 'home' }"
    >
      <ButtonGroup />
      <slot />
    </div>
  </div>
</template>
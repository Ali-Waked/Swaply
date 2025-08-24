<script setup>
import ButtonGroup from "../ButtonGroup.vue";
import { useRouter } from "vue-router";
import NotificationsContainer from "../NotificationsContainer.vue";
import { inject, onMounted, reactive } from "vue";
const router = useRouter();
const links = [
  "personal_profile",
  "home",
  "search-map",
  "search-list-stores",
  "pricing",
];
const emitter = inject("emitter");
const notifications = reactive([]);
onMounted(() => {
  emitter.on(
    "showNotificationAlert",
    ([type = "info", message, duration = 3000]) => {
      const id = Date.now() + Math.random();
      notifications.push({ id, message, type, duration });
      console.log("hi");

      setTimeout(() => {
        const index = notifications.findIndex((n) => n.id === id);
        if (index !== -1) notifications.splice(index, 1);
      }, duration);
    }
  );
});
</script>

<template>
  <div
    class="dark:bg-gray-800"
    :class="{ 'bg-gray-100': !links.includes(router.currentRoute.value.name) }"
  >
    <div
      class="mx-auto p-2 sm:p-0"
      :class="{
        container: router.currentRoute.value.name != 'home',
      }"
    >
      <ButtonGroup />
      <slot />
    </div>
  </div>
  <NotificationsContainer :notifications="notifications" />
</template>
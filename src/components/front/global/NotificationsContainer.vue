<!-- components/NotificationsContainer.vue -->
<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col items-end">
    <NotificationAlert
      v-for="(note, index) in notifications"
      :key="note.id"
      :message="note.message"
      :type="note.type"
      :duration="note.duration"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import NotificationAlert from "./NotificationAlert.vue";
defineProps({
  notifications: Object,
});

// const notifications = reactive([]);

// import { notifications } from "../../../utils/notificationService";
</script>

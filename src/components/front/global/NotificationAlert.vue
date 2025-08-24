<!-- components/Notification.vue -->
<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      :class="[
        'max-w-xs w-full px-4 py-2 rounded shadow-md text-white font-medium mb-2',
        type === 'success' ? 'bg-green-500 dark:bg-green-600' : '',
        type === 'error' ? 'bg-red-500 dark:bg-red-600' : '',
        type === 'info' ? 'bg-blue-500 dark:bg-blue-600' : '',
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  message: String,
  type: { type: String, default: "info" }, // success / error / info
  duration: { type: Number, default: 3000 },
});

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

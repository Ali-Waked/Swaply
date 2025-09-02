<!-- components/Notification.vue -->
<template>
  <transition name="slide-fade">
    <div
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded shadow-md text-white font-medium mb-2 transition-all duration-200 absolute top-2 text-nowrap',
        typeClasses,
        visible ? 'right-2' : '-right-full',
      ]"
    >
      <!-- Icon -->
      <span class="w-5 h-5 flex-shrink-0">
        <component :is="iconComponent" class="w-[22px]" />
      </span>

      <!-- Message -->
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Heroicons
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  message: String,
  type: { type: String, default: "info" }, // success / error / info
  duration: { type: Number, default: 3000 },
});

const visible = ref(true);

const typeClasses = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-500 dark:bg-green-600";
    case "error":
      return "bg-red-500 dark:bg-red-600";
    case "info":
    default:
      return "bg-blue-500 dark:bg-blue-600";
  }
});

const iconComponent = computed(() => {
  switch (props.type) {
    case "success":
      return CheckCircleIcon;
    case "error":
      return XCircleIcon;
    case "info":
    default:
      return InformationCircleIcon;
  }
});

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

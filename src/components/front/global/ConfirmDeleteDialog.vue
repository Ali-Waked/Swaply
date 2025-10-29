<template>
  <div
    v-if="open"
    class="fixed inset-0 flex items-center justify-center z-[100000000]"
  >
    <div
      class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
      @click="close"
    ></div>

    <div
      class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-6 z-10"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        حذف المنتج
      </h2>

      <p class="mt-2 text-gray-600 dark:text-gray-300">
        هل أنت متأكد أنك تريد حذف هذا المنتج؟ هذا الإجراء لا يمكن التراجع عنه.
      </p>

      <div class="mt-6 flex gap-3">
        <button
          @click="close"
          class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          الغاء
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          حذف
        </button>
      </div>
    </div>
  </div>
  <!-- <NotificationsContainer /> -->
</template>

<script setup>
import { inject, ref, watch } from "vue";
// import { addNotification } from "../../../utils/notificationService.js";

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emitter = inject("emitter");

const emits = defineEmits(["update:open", "confirm"]);

const close = () => {
  emits("update:open", false);
};

const confirmDelete = () => {
  emitter.emit("showNotificationAlert", ["success", "تم حذف المنتج بنجاح!"]);
  emits("confirm");
  close();
};

// 🔒 منع تمرير الصفحة عند فتح الـ Dialog
watch(
  () => props.open,
  (val) => {
    document.body.style.overflow = val ? "hidden" : "";
  }
);
</script>

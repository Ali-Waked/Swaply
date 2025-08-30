<script setup>
import { reactive } from "vue";
import ActiveNotificationBox from "./ActiveNotificationBox.vue";
import NotificationSectionTitle from "./NotificationSectionTitle.vue";

const items = reactive([
  {
    title: "البيض (12 حبة)",
    isActive: true,
    whenRun: "اقل من 20",
  },
  {
    title: "خبز عربي",
    isActive: true,
    whenRun: "اعلى من 8",
    alerted: true,
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
  {
    title: "البيض (12 حبة)",
    isActive: true,
    whenRun: "اقل من 20",
  },
  {
    title: "خبز عربي",
    isActive: true,
    whenRun: "اعلى من 8",
    alerted: true,
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
  {
    title: "لحم غنم (1 كغ)",
    isActive: false,
    whenRun: "اقل من 65",
  },
]);
</script>

<template>
  <div
    class="px-6 pt-8 pb-6 rounded-[20px] overflow-y-auto shadow-md h-full max-h-[644px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <NotificationSectionTitle title="التنبيهات النشطة" class="mb-6" />
    <template v-for="item in items" :key="item.title">
      <ActiveNotificationBox
        :title="item.title"
        v-model:is-active="item.isActive"
        :whenRun="item.whenRun"
        :alerted="item.alerted"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
/* Firefox */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
</style>
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
    class="px-6 pt-8 pb-6 rounded-[20px] shadow-md max-h-[652px] h-full overflow-y-auto has-scroll bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <NotificationSectionTitle title="التبيهات النشطة" class="mb-6" />
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
.has-scroll {
  //   scrollbar-width: thin;
  //   scrollbar-color: #888 #f1f1f1;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE و Edge */
}

.has-scroll::-webkit-scrollbar {
  //   width: 2px;
  display: none;
}

// .has-scroll::-webkit-scrollbar-track {
//   background: #f1f1f1;
//   border-radius: 10px;
// }

// .has-scroll::-webkit-scrollbar-thumb {
//   background: #888;
//   border-radius: 10px;
// }

// .has-scroll::-webkit-scrollbar-thumb:hover {
//   background: #555;
// }
</style>
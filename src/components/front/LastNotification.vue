<script setup>
import LastNotificationBox from "./LastNotificationBox.vue";
import NotificationSectionTitle from "./NotificationSectionTitle.vue";

const items = [
  {
    title: "البيض انخفض الى 16 في سوق الشجاعية",
    time: "منذ 15 دقيقية",
    isDecrease: true,
    // isIncrease: '',
    // isUrgent: '',
  },
  {
    title: "تحذير ارتفاع سعر الخبز الى 30%",
    time: "منذ ساعة",
    // isDecrease: '',
    isIncrease: true,
    isUrgent: true,
  },
  {
    title: "عرض جديد: خصم على اللحوم في السوق المركزي",
    time: "منذ ساعتين",
    // isDecrease: '',
    // isIncrease: '',
    // isUrgent: '',
  },
];
</script>

<template>
  <div
    class="px-6 pt-8 pb-2 rounded-[20px] shadow-md bg-white dark:bg-gray-900"
  >
    <div class="flex items-center justify-between mb-6">
      <NotificationSectionTitle title="الاشعارات الاخيرة" />
      <button
        class="show-more text-gray-600 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-lg text-[12px] w-[94px] h-8 font-[500] bg-gray-100 dark:bg-gray-700 transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        عرض الكل
      </button>
    </div>

    <template v-for="item in items" :key="item.title">
      <LastNotificationBox
        :title="item.title"
        :time="item.time"
        :is-decrease="item.isDecrease"
        :is-increase="item.isIncrease"
        :is-urgent="item.isUrgent"
      />
    </template>
  </div>
</template>
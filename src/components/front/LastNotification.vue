<script setup>
import { computed, onMounted } from "vue";
import LastNotificationBox from "./LastNotificationBox.vue";
import NotificationSectionTitle from "./NotificationSectionTitle.vue";
import { ref } from "vue";
import { useNotificationStore } from "../../stores/notification";
import { storeToRefs } from "pinia";

// const props = defineProps({
//   modelValue: {
//     type: Boolean,
//     default: false,
//   },
// });

// const emit = defineEmits(["update:modelValue"]);

const isShowAll = ref(false);
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

const notificationStore = useNotificationStore();
const { lastNotifications } = storeToRefs(notificationStore);

onMounted(async () => {
  await notificationStore.fetchLastNotifications();
});
</script>

<template>
  <div
    class="px-6 pt-8 h-[330px] pb-2 rounded-[20px] shadow-md bg-white dark:bg-gray-900"
    :class="{ 'overflow-y-auto': isShowAll, 'overflow-y-hidden': !isShowAll }"
    v-if="lastNotifications.data"
  >
    <div class="flex items-center justify-between mb-6">
      <NotificationSectionTitle title="الاشعارات الاخيرة" />
      <button
        v-if="lastNotifications.data.length > 2"
        @click="isShowAll = !isShowAll"
        class="show-more text-gray-600 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-lg text-[12px] w-[94px] h-8 font-[500] bg-gray-100 dark:bg-gray-700 transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        {{ isShowAll ? "عرض اقل" : "عرض الكل" }}
      </button>
    </div>

    <template v-for="item in lastNotifications.data" :key="item.id">
      <LastNotificationBox
        :title="item.data.title"
        :time="item.created_at"
        :is-decrease="item.data.status == 'lt'"
        :is-increase="item.data.status == 'gt'"
        :is-urgent="item.isUrgent"
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
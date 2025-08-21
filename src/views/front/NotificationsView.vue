<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import HeaderTitle from "../../components/front/global/HeaderTitle.vue";
import NotificationSetting from "../../components/front/NotificationSetting.vue";
import LastNotification from "../../components/front/LastNotification.vue";
import ActiveNotification from "../../components/front/ActiveNotification.vue";
import AddNotification from "../../components/front/AddNotification.vue";
</script>

<template>
  <div
    class="back-button flex items-center justify-start cursor-pointer gap-2 mb-4"
  >
    <ArrowRightIcon
      class="w-4 h-4 cursor-pointer hidden lg:block text-black dark:text-white"
    />
    <span class="text-black dark:text-white">الرجوع</span>
  </div>

  <HeaderTitle
    title="مركز التنبيهات"
    subtitle="تتبع تغييرات الاسعار و احصل على اشعارات فورية"
  />
  <div class="flex gap-8 mt-12 flex-col lg:flex-row">
    <div class="left-site flex-1">
      <div class="notification-setting w-full">
        <NotificationSetting />
        <LastNotification />
      </div>
    </div>
    <div class="right-site flex-1 relative">
      <ActiveNotification />
      <span
        class="absolute w-full left-0 bottom-0 rounded-bl-[20px] rounded-br-[20px] h-8 bg-white dark:bg-gray-900 opacity-45"
      ></span>
    </div>
  </div>
  <AddNotification />
</template>
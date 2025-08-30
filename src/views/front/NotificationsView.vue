<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import HeaderTitle from "../../components/front/global/HeaderTitle.vue";
import NotificationSetting from "../../components/front/NotificationSetting.vue";
import LastNotification from "../../components/front/LastNotification.vue";
import ActiveNotification from "../../components/front/ActiveNotification.vue";
import AddNotification from "../../components/front/AddNotification.vue";
import { ref } from "vue";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";

const showAll = ref(false);

// const showAllNotifications = () => {
//   showAll.value = true;
// };
</script>

<template>
  <HeaderPage>
    <LogoSection />
  </HeaderPage>

  <HeaderTitle
    title="مركز التنبيهات"
    subtitle="تتبع تغييرات الاسعار و احصل على اشعارات فورية"
  />
  <div class="flex gap-8 mt-12 flex-col lg:flex-row">
    <div class="left-site flex-1">
      <div class="notification-setting w-full">
        <NotificationSetting />
        <LastNotification v-model="showAll" />
      </div>
    </div>
    <div class="right-site flex-1 relative">
      <ActiveNotification :showScroll="showAll" />
      <span
        class="absolute w-full left-0 bottom-0 h-8 rounded-bl-[20px] rounded-br-[20px] bg-gradient-to-t from-white to-transparent dark:from-gray-900"
      ></span>
    </div>
  </div>
  <div class="pb-4">
    <AddNotification />
  </div>
</template>
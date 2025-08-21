<script setup>
import { BellAlertIcon } from "@heroicons/vue/24/outline";
import SingleNotification from "./SingleNotification.vue";
import { mdiEmailOutline, mdiWhatsapp } from "@mdi/js";
import { reactive } from "vue";

const items = reactive([
  {
    icon: BellAlertIcon,
    from: "heroicons",
    title: "اشعارات الرسائل النصية",
    description: "تلقي التنبيهات عبر القصيرة SMS",
    isEnable: true,
  },
  {
    icon: mdiEmailOutline,
    from: "mdi",
    title: "اشعارات البريد الالكتروني",
    description: "تلقي التنبيهات عبر رسائل البريد",
    isEnable: false,
  },
  {
    icon: mdiWhatsapp,
    from: "mdi",
    title: "اشعارات الواتساب (WhatsApp)",
    description: "تلقي التنبيهات عبر رسائل البريد",
    isEnable: true,
  },
]);
</script>

<template>
  <div class="w-full">
    <template v-for="item in items" :key="item.title">
      <SingleNotification
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :from="item.from"
        v-model:is-enable="item.isEnable"
      />
    </template>
  </div>
</template>
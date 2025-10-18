<script setup>
import { BellAlertIcon } from "@heroicons/vue/24/outline";
import SingleNotification from "./SingleNotification.vue";
import { mdiEmailOutline, mdiWhatsapp } from "@mdi/js";
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const items = reactive([
  {
    id: "sms",
    icon: BellAlertIcon,
    from: "heroicons",
    title: "اشعارات الرسائل النصية",
    description: "تلقي التنبيهات عبر القصيرة SMS",
    isEnable: user.value.notification_methods?.sms,
  },
  {
    id: "email",
    icon: mdiEmailOutline,
    from: "mdi",
    title: "اشعارات البريد الالكتروني",
    description: "تلقي التنبيهات عبر رسائل البريد",
    isEnable: user.value.notification_methods?.email,
  },
  {
    id: "whats",
    icon: mdiWhatsapp,
    from: "mdi",
    title: "اشعارات الواتساب (WhatsApp)",
    description: "تلقي التنبيهات عبر رسائل البريد",
    isEnable: user.value.notification_methods?.whats,
  },
]);
onMounted(() => {
});
</script>

<template>
  <div class="w-full">
    <pre></pre>
    <template v-for="item in items" :key="item.id">
      <SingleNotification :title="item.title" :description="item.description" :icon="item.icon" :from="item.from"
        :id="item.id" v-model:is-enable="item.isEnable" />
    </template>
  </div>
</template>
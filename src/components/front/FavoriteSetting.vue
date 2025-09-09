<script setup >
import { ref, watch } from "vue";
import RadioComponent from "./global/RadioComponent.vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SingleFavoriteStraucture from "./SingleFavoriteStraucture.vue";
import { Switch } from "@headlessui/vue";
import BaseSwitch from "./global/BaseSwitch.vue";
import { useThemeStore } from "../../stores/theme";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth/auth";

const langSelected = ref("ar");
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
// const apperenceSelected = ref("ligth");

const enabled = ref(user.value?.recive_notification ?? false);
const currencySelected = ref(user.value?.currency || "ILS");
const langs = [
  {
    label: "العربية",
    id: "ar",
  },
  {
    label: "english",
    id: "en",
  },
];

watch(currencySelected, async (newVal) => {
  await authStore.update({ currency: newVal });
  user.value.currency = newVal;
});
watch(enabled, async (newVal) => {
  await authStore.update({ recive_notification: +newVal });
  user.value.recive_notification = newVal;
});
// const apperences = [
//   {
//     label: "فاتح",
//     id: "ligth",
//   },
//   {
//     label: "داكن",
//     id: "dark",
//   },
// ];
const currency = [
  {
    label: "دولار",
    id: "USD",
  },
  {
    label: "شيكل",
    id: "ILS",
  },
];
// watch(apperenceSelected, (newVal) => {
//   if (newVal === "dark") {
//     document.body.classList.add("dark");
//   } else {
//     document.body.classList.remove("dark");
//   }
// });

const themeStore = useThemeStore();
const theme = storeToRefs(themeStore);
const { currentTheme } = theme;
const themes = themeStore.themes;
</script>

<template>
  <SecandryTitle label="التفضيلات" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <!-- <SingleFavoriteStraucture title="اللغة" description="اختر لغة التطبيق">
      <template #action>
        <RadioComponent
          :items="langs"
          name="lang"
          v-model:selected="langSelected"
        />
      </template>
    </SingleFavoriteStraucture> -->
    <SingleFavoriteStraucture title="المظهر" description="اختر مظهر التطبيق">
      <template #action>
        <RadioComponent
          :items="themes"
          name="theme"
          v-model:selected="currentTheme"
        />
      </template>
    </SingleFavoriteStraucture>
    <SingleFavoriteStraucture title="الوحدة" description="وحدة قياس الاسعار">
      <template #action>
        <RadioComponent
          :items="currency"
          name="currency"
          v-model:selected="currencySelected"
        />
      </template>
    </SingleFavoriteStraucture>
    <SingleFavoriteStraucture
      title="التنبيهات"
      description="تفعيل اشعارات الاسعار"
    >
      <template #action>
        <BaseSwitch v-model:model-value="enabled" />
      </template>
    </SingleFavoriteStraucture>
  </div>
</template>
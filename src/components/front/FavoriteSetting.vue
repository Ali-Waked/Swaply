<script setup >
import { ref, watch } from "vue";
import RadioComponent from "./global/RadioComponent.vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SingleFavoriteStraucture from "./SingleFavoriteStraucture.vue";
import { Switch } from "@headlessui/vue";
import BaseSwitch from "./global/BaseSwitch.vue";

const enabled = ref(false);
const langSelected = ref("ar");
const apperenceSelected = ref("ligth");
const currencySelected = ref("ils");
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
const apperences = [
  {
    label: "فاتح",
    id: "ligth",
  },
  {
    label: "داكن",
    id: "dark",
  },
];
const currency = [
  {
    label: "دولار",
    id: "usd",
  },
  {
    label: "شيكل",
    id: "ils",
  },
];
watch(apperenceSelected, (newVal) => {
  if (newVal === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
</script>

<template>
  <SecandryTitle label="التفضيلات" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <SingleFavoriteStraucture title="اللغة" description="اختر لغة التطبيق">
      <template #action>
        <RadioComponent
          :items="langs"
          name="lang"
          v-model:selected="langSelected"
        />
      </template>
    </SingleFavoriteStraucture>
    <SingleFavoriteStraucture title="المظهر" description="اختر مظهر التطبيق">
      <template #action>
        <RadioComponent
          :items="apperences"
          name="apperence"
          v-model:selected="apperenceSelected"
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
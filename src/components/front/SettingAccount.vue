<script setup >
import SecandryTitle from "./global/SecandryTitle.vue";
import SingleSettingAccountBox from "./SingleSettingAccountBox.vue";
const items = [
  {
    label: "الاسم",
    value: "احمد محمود",
  },
  {
    label: "الايميل",
    value: "example@gmail.clom",
  },
  {
    label: "رقم الهاتف",
    value: "9702525252552",
  },
];
</script>

<template>
  <SecandryTitle label="اعدادات الحساب" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <template v-for="item in items" :key="item.label">
      <SingleSettingAccountBox
        :label="item.label"
        :value="item.value"
        class="dark:text-white"
      />
    </template>
  </div>
</template>
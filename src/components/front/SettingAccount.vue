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
  <div class="border rounded-xl p-6">
    <template v-for="item in items" :key="item.lable">
      <SingleSettingAccountBox :label="item.label" :value="item.value" />
    </template>
  </div>
</template>
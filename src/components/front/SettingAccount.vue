<script setup >
import { ref } from "vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SelectListBox from "./global/SelectListBox.vue";
import SingleSettingAccountBox from "./SingleSettingAccountBox.vue";
import { ShoppingBagIcon, UserIcon } from "@heroicons/vue/24/outline";
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

const accountOptionsType = [
  { id: "1", name: "مستهلك", label: "حساب تجاري" },
  { id: "2", name: "تاجر", label: "حساب مستهلك" },
];

const merchantSettings = [
  {
    label: "اسم المحل",
    value: "متجر احمد للمواد الغذائية",
  },
  {
    label: "عنوان المحل",
    value: "شارع الوحدة, غزة فلسطين",
  },
];

const selectedAccountType = ref(accountOptionsType[0]);
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
    <div
      class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 dark:border-gray-700"
    >
      <span
        class="text-gray-600 dark:text-gray-300 font-[500] text-[14px] mb-3 block"
      >
        نوع الحساب
      </span>
      <div class="flex justify-between items-center">
        <SelectListBox
          :options="accountOptionsType"
          v-model="selectedAccountType"
        />
        <div class="flex items-center gap-2">
          <span class="text-green-600 dark:text-green-400">
            <UserIcon
              class="w-5"
              v-if="selectedAccountType.name === 'مستهلك'"
            />
            <ShoppingBagIcon class="w-5 h-5" v-else />
          </span>
          <span class="text-[14px] font-[400] text-gray-600 dark:text-gray-300">
            {{ selectedAccountType.label }}
          </span>
        </div>
      </div>
    </div>
    <template v-if="selectedAccountType.name == 'تاجر'">
      <template v-for="item in merchantSettings" :key="item.label">
        <SingleSettingAccountBox
          :label="item.label"
          :value="item.value"
          class="dark:text-white"
        />
      </template>
    </template>
  </div>
</template>
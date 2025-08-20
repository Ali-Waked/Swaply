<script setup>
import { ref } from "vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SingleSettingAccountBox from "./SingleSettingAccountBox.vue";
import BaseSwitch from "./global/BaseSwitch.vue";
import SingleFavoriteStraucture from "./SingleFavoriteStraucture.vue";
const location = ref(true);
const twoFA = ref(false);
</script>

<template>
  <SecandryTitle label="الخصوصية و الامان" class="mb-3" />
  <div class="border rounded-xl p-6">
    <SingleSettingAccountBox
      label="كلمة المرور"
      value="password"
      input-type="password"
    />
    <SingleFavoriteStraucture
      title="التحقق بخطوتين"
      description="تفعيل طبقة امان اضافية"
    >
      <template #action>
        <BaseSwitch v-model:model-value="twoFA" />
      </template>
    </SingleFavoriteStraucture>
    <SingleFavoriteStraucture
      title="مشاركة الموقع"
      description="السماح بمشاركة موقعك"
    >
      <template #action>
        <BaseSwitch v-model:model-value="location" />
      </template>
    </SingleFavoriteStraucture>
    <div class="mt-4">
      <p class="text-red-600 font-[500] text-[16px] mb-3 block">منطقة خطر</p>
      <button
        class="font-[500] text-white bg-red-600 hover:opacity-70 transition-opacity rounded-lg w-full block py-[6px]"
      >
        حذف الحساب
      </button>
      <p class="text-[12px] text-gray-500 mt-2 text-center font-[400]">
        حذف الحساب سوف يؤدي الي فقدان جميع البيانات بشكل نهائي
      </p>
    </div>
  </div>
</template>
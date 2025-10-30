<script setup>
import SecondaryTitle from "./global/SecondaryTitle.vue";
import SingleFavoriteStructure from "./SingleFavoriteStructure.vue";
</script>

<template>
  <SecondaryTitle label="حول التطبيق" class="mb-3" />
  <div class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div
      class="last-of-type:border-none border-b dark:border-gray-700 last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 flex items-center">
      <div>
        <span class="text-blue-950 dark:text-white font-bold text-[26px] mb-3 block">نبض الاسعار</span>
        <span class="text-gray-600 dark:text-gray-300 font-medium text-[20px] mb-2 block">الاصدار 1.0.0</span>
      </div>
    </div>

    <SingleFavoriteStructure class="pb-0 border-none -mb-2" title="مهمتنا"
      description="نبض الاسعار هو تطبيق مصمم لخدمة المجتمع في اوقات الازمات من خلال توفير معلومات دقيقة ومحديثة عن اسعار الموارد الاساسية والسلع." />

    <div class="mt-4">
      <span class="text-black dark:text-white font-medium text-[16px] mb-3 block">ميزاتنا</span>
      <span class="text-gray-600 dark:text-gray-300 font-medium text-[14px] mb-2 block">
        <ul class="list-disc pr-4">
          <li class="mb-1">تتبع اسعار المواد الاساسية</li>
          <li class="mb-1">نظام تنبيهات ذكي</li>
          <li class="mb-1">منصة مقايضة مجتمعية</li>
          <li class="mb-1">وضع الطوارئ للازمات</li>
        </ul>
      </span>
    </div>

    <div class="last-of-type:border-none border-b last-of-type:p-0 mt-4 first-of-type:mt-0 flex">
      <div>
        <span class="text-black dark:text-white font-medium text-[16px] mb-3 block">تواصل معنا</span>
        <span class="text-gray-600 dark:text-gray-300 font-medium text-[14px] mb-2 block">
          للدعم و الاستفسارات: support@pricebeats.app
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-ul {
  li {
    position: relative;

    &::after {
      content: ">*";
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
    }
  }
}
</style>

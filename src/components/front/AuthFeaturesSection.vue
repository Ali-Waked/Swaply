<script setup>
import {
  ArrowsRightLeftIcon,
  BuildingStorefrontIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/24/solid";
import { mdiAccountDetails } from "@mdi/js";

const data = [
  {
    icon: ExclamationCircleIcon,
    title: "التنبيهات الطارئة",
    text: "اشترك لنرسل لك اسعارالسلع عند انخفاضها عبر الرسائل النصية, حتى دون انترنت.",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "قائمتك الخاصة",
    text: "حفظ متاجر مفضلة و تتبع اسعارها و عروضها",
  },
  {
    icon: IdentificationIcon,
    title: "هوية امنة",
    text: "بناء سمعة موثوقة للابلاغ عن الاسعار. تسجيلك يزيد مصداقيتك",
  },
  {
    icon: ArrowsRightLeftIcon,
    title: "مقايضة موثوقة",
    text: "قم بعرض مقايضات مع جيرانك بعد التحقق من الهوية",
  },
  {
    type: "button",
    title: "سجل الان - مجانا",
  },
  {
    icon: ShieldCheckIcon,
    title: "تواصل امن",
    text: "تواصل مباشرة مع متاجر قريبة موثوقة",
  },
];
</script>


<template>
  <div class="container mx-auto">
    <div class="bg-sky-100 dark:bg-blue-300/20 px-8 py-12 rounded-3xl">
      <h4
        class="title text-gray-950 dark:text-gray-200 font-[400] text-center text-[26px] mb-12"
      >
        سجل الدخول للحصول على مزايا متقدمة
      </h4>

      <div class="grid grid-cols-3 gap-8">
        <div
          class="box flex flex-col items-center text-center"
          v-for="item in data"
          :key="item.title"
        >
          <template v-if="item.icon">
            <component
              :is="item.icon"
              class="w-16 h-16 text-gray-700 dark:text-gray-300"
            />
            <p
              class="title text-gray-700 dark:text-gray-200 font-[500] text-[18px] my-2"
            >
              {{ item.title }}
            </p>
            <p class="text text-[14px] text-gray-400 dark:text-gray-400">
              {{ item.text }}
            </p>
          </template>

          <template v-else>
            <div class="join-now flex justify-center items-center h-full">
              <button
                class="border border-sky-600 rounded-lg px-7 py-[10px] font-[400] text-sky-600 transition-all hover:text-blue-800 hover:border-blue-800 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:border-blue-300"
              >
                {{ item.title }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
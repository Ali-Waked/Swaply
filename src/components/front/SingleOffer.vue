<script setup >
import {
  ChatBubbleOvalLeftIcon,
  CubeIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import { ArrowsRightLeftIcon, CheckIcon } from "@heroicons/vue/24/solid";
import { MapPinIcon } from "@heroicons/vue/24/outline";
import { ClockIcon } from "@heroicons/vue/24/outline";
import MainButton from "./global/MainButton.vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/24/outline";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import ScondButton from "./ScondButton.vue";

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div
    class="single-offer p-4 bg-white dark:bg-gray-800 rounded-[10px] hover:shadow-md border border-gray-300 transition"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="info flex items-center gap-2">
        <div
          class="icon bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full"
        >
          <UserIcon class="w-5 h-5 text-gray-600" />
        </div>
        <div class="">
          <span class="font-[500] flex">
            <span class="text-gray-800">أحمد م.</span>
            <span
              class="text-[11px] border border-gray-200 py-1 px-[6px] rounded-md flex items-center gap-1 ml-2 w-fit justify-center mr-2"
            >
              <CheckIcon class="w-3 h-3 text-gray-600" />
              <span>موثوق</span>
            </span>
          </span>
          <div class="degree text-gray-400 text-[12px] font-[500] mt-1">
            درجة الموثوقية 80%
          </div>
        </div>
      </div>
      <div
        class="text-white bg-red-600 rounded-md w-12 h-6 flex items-center justify-center"
      >
        <span class="font-[500] text-[10px]">عاجل</span>
      </div>
    </div>
    <div
      class="flex items-center justify-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
    >
      <div class="flex flex-col items-center">
        <span class="font-[400] text-[14px] text-gray-500">يعرض</span>
        <span class="text-green-600 font-[400]">5 لتر بنزين</span>
      </div>
      <ArrowsRightLeftIcon class="w-5 h-5 text-gray-600" />
      <div class="flex flex-col items-center">
        <span class="font-[400] text-[14px] text-gray-500">يريد</span>
        <span class="text-blue-600 font-[400]">حليب اطفال (2علبة)</span>
      </div>
    </div>
    <div class="text-[14px] text-gray-600 font-[400] mt-4">
      <div class="message">بنزين نظيف احتاج حليب اطفال بشكل عاجا</div>
      <div class="location flex items-center justify-between mt-2">
        <div>
          <MapPinIcon class="w-4 h-4 text-gray-600 inline-block" />
          <span class="inline-block mr-1 text-[12px]">الرمال,غزة</span>
        </div>
        <span class="time">
          <ClockIcon class="w-4 h-4 text-gray-600 inline-block" />
          <span class="inline-block mr-1 text-[12px]">قبل 3 ساعات</span>
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <div class="flex items-center gap-2">
        <button
          @click="toggle"
          class="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 transition-all border border-gray-300 rounded-lg text-[14px]"
        >
          <span class="font-[500]">تفاصيل اكثر</span>
          <ChevronDownIcon
            :class="isOpen ? 'rotate-180 transform' : ''"
            class="w-4 h-4 text-black mr-2 mt-[2px] transition-transform font-[400]"
          />
        </button>

        <MainButton
          class="text-[14px] flex-1"
          label="بدا المحادثة"
          @click="$emit('startChat')"
        />
      </div>

      <div v-show="isOpen" class="p-2 text-gray-600 w-full transition-all">
        <div class="info-user bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <div class="flex items-center gap-2 mb-4">
            <UserIcon class="w-4 h-4 text-blue-900" />
            <span class="font-[500] text-blue-900 text-[16px]"
              >معلومات المستخدم</span
            >
          </div>
          <div class="flex flex-col gap-3">
            <div
              class="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-between"
            >
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <StarIcon class="w-4 h-4 inline-block text-amber-600" />
                  </span>
                  <span class="text-gray-500 text-[14px] font-[400]"
                    >التقييم:</span
                  >
                </span>
                <span class="value text-black font-[400] text-[14px]">
                  <span class="rate ml-1">4.8/5</span>
                  <span class="opration">(15 عملية)</span>
                </span>
              </div>
              <div class="flex flex-1">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <CalendarIcon
                      class="w-[14px] h-[14px] text-blue-700 inline-block"
                    />
                  </span>
                  <span class="text-gray-500 text-[14px] font-[400]"
                    >عضو منذ 6 اشهر</span
                  >
                </span>
              </div>
            </div>
            <div
              class="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-start"
            >
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <ChatBubbleOvalLeftIcon
                      class="w-[14px] h-[14px] text-green-700 inline-block"
                    />
                  </span>
                  <span class="text-gray-500 text-[14px] font-[400]"
                    >التواصل:</span
                  >
                </span>
                <span class="value text-black font-[400] text-[14px]">
                  واتساب متوفر
                </span>
              </div>
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <ShieldCheckIcon
                      class="w-[15px] h-[15px] text-green-700 inline-block"
                    />
                  </span>
                  <span class="text-gray-500 text-[14px] font-[400]"
                    >درجةالثقة:</span
                  >
                </span>
                <span class="value text-green-700 font-[400] text-[14px]">
                  87%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="cart-details bg-green-50 border border-green-100 p-4 rounded-lg mt-4"
        >
          <div class="flex items-center gap-2 mb-4">
            <CubeIcon class="w-4 h-4 text-green-900" />
            <span class="font-[500] text-green-900 text-[16px]"
              >تفاصيل السة المعروضة</span
            >
          </div>
          <div>
            <div
              class="jsutify-between mb-2 flex items-start sm:items-center flex-col sm:flex-row gap-2"
            >
              <div class="flex-1">
                <span class="text-gray-500 text-[14px] font-[400] block"
                  >الحالة:</span
                >
                <span class="text-green-700 text-[14px] font-[500] block"
                  >جديد - لم يستعمل</span
                >
              </div>
              <div class="flex-1">
                <span class="text-gray-500 text-[14px] font-[400] block"
                  >الكمية:</span
                >
                <span class="text-green-700 text-[14px] font-[500] block"
                  >5 لتر بالضبط</span
                >
              </div>
            </div>
            <div class="flex items-center jsutify-between mb-2">
              <div class="flex-1">
                <span class="text-gray-500 text-[14px] font-[400] block"
                  >التوفر:</span
                >
                <span class="text-green-700 text-[14px] font-[500] block"
                  >متوفر الان</span
                >
              </div>
            </div>
            <div class="flex items-center jsutify-between">
              <div class="flex-1">
                <span class="text-gray-500 text-[14px] font-[400] block"
                  >تفضيلات التبادل:</span
                >
                <span class="text-green-700 text-[14px] font-[500] block"
                  >تبادل مباشر مفضل</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="cart-details bg-gray-50 border border-gray-100 p-4 rounded-lg mt-4"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="font-[500] text-dark text-[16px]">وصف مفصل</span>
          </div>
          <div class="text-gray-500 text-[14px] font-[400]">
            <p>
              بنزين نظيف جدا و لم يستعمل من قبل. احتاج حليب اطفال بشكل عاجل
              لابني. يفضل المقايضة المباشرة.
            </p>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2"
        >
          <ScondButton title="رسالة سريعة">
            <template #icon>
              <ChatBubbleOvalLeftIcon class="w-4 h-4" />
            </template>
          </ScondButton>
          <ScondButton title="حفظ للمفضلة">
            <template #icon>
              <StarIcon class="w-4 h-4" />
            </template>
          </ScondButton>
          <ScondButton title="عرض الموقع">
            <template #icon>
              <MapPinIcon class="w-4 h-4" />
            </template>
          </ScondButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PhoneIcon, ShieldCheckIcon } from "@heroicons/vue/24/outline";
import SecandryTitle from "./global/SecandryTitle.vue";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const joinedAt = computed(() => {
  const date = new Date(user.value.created_at);
  const month = date.toLocaleDateString("ar-EG", { month: "long" });
  const year = date.getFullYear();
  return `انضم في ${month} ${year}`;
});

const letterImage = computed(() => {
  const parts = user.value.name.trim().split(" ");

  const first = parts[0]?.charAt(0).toUpperCase() || "";
  const second = parts[1]?.charAt(0).toUpperCase() || "";

  return first + second;
});
</script>

<template>
  <SecandryTitle label="الملف الشخصي" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <div class="info flex items-center gap-4 mb-7">
      <div
        class="icon bg-gray-100 dark:bg-gray-700 h-14 w-14 flex items-center justify-center rounded-full font-[500] text-[14px] text-blue-950 dark:text-white"
      >
        {{ letterImage }}
      </div>
      <div>
        <span class="font-[500]">
          <p class="text-blue-950 dark:text-white">{{ user.name }}</p>
          <p
            class="degree text-gray-700 dark:text-gray-300 text-[12px] font-[500] mt-1"
          >
            {{ joinedAt }}
          </p>
          <p class="flex mt-1 -mr-1">
            <span
              class="text-[12px] flex items-center gap-2 text-blue-950 dark:text-gray-200"
            >
              <PhoneIcon class="w-4 h-4 text-blue-950 dark:text-gray-200" />
              <span>{{ user.phone ?? "غير مسجل" }}</span>
            </span>
            <span
              v-if="user.is_trusty"
              class="text-[9px] bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 py-[6px] px-[8px] rounded-md flex items-center gap-1 ml-2 w-fit justify-center mr-2"
            >
              <ShieldCheckIcon class="w-3 h-3" />
              <span>موثوق</span>
            </span>
          </p>
        </span>
      </div>
    </div>

    <span class="block w-full h-[1px] bg-gray-300 dark:bg-gray-600"></span>

    <div class="degree-ability mt-4">
      <div class="flex items-center justify-between mb-2">
        <span class="font-[400] text-gray-700 dark:text-gray-300 text-[13px]"
          >درجة الموثوقية</span
        >
        <span class="text-blue-950 dark:text-white font-[400] text-[13px]"
          >87%</span
        >
      </div>
      <div class="w-full h-2 rounded-md bg-blue-200 dark:bg-gray-700 relative">
        <div
          class="absolute left-0 top-0 h-full w-[87%] bg-blue-950 dark:bg-white rounded-md"
        ></div>
      </div>
    </div>

    <div class="flex gap-4 items-center justify-between mt-4">
      <div
        class="box flex-1 text-center bg-green-100 dark:bg-green-700/60 p-4 rounded-lg"
      >
        <span class="font-[600] text-[32px] text-green-600 dark:text-green-300"
          >11</span
        >
        <p class="font-[400] text-[14px] text-green-800 dark:text-green-200">
          تقارير دقيقة
        </p>
      </div>
      <div
        class="box flex-1 text-center bg-blue-100 dark:bg-blue-700/60 p-4 rounded-lg"
      >
        <span class="font-[600] text-[32px] text-blue-600 dark:text-blue-300">{{
          user.barters_count
        }}</span>
        <p class="font-[400] text-[14px] text-blue-800 dark:text-blue-200">
          مقايضات ناجحة
        </p>
      </div>
    </div>
  </div>
</template>
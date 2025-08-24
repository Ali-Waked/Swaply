<script setup >
import { ArrowTrendingUpIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import { ArrowsRightLeftIcon, UserIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/outline";
// import { CircleIcon } from "@heroicons/vue/24/outline";
import { BellIcon } from "@heroicons/vue/24/outline";
import SingleButtonGroup from "./SingleButtonGroup.vue";
import { inject, onMounted, ref } from "vue";

const buttonGroup = ref("buttonGroup");

const emitter = inject("emitter");
onMounted(() => {
  emitter.on("hiddenButton", (event) => {
    if (event) {
      buttonGroup.value.style.zIndex = "1";
      return;
    }
    buttonGroup.value.style.zIndex = "100000";
  });
});
</script>

<template>
  <!-- <div class="h-[58px] mb-8"> -->
  <div
    ref="buttonGroup"
    class="flex items-center justify-center shoadow-lg bg-white rounded-lg overflow-hidden space-x-4 dark:bg-gray-800 shadow-md flex-1 p-0 sticky top-4 left-0 right-0 z-[10000000] mx-auto w-fit"
  >
    <single-button-group title="الاسعار" name="pricing">
      <template #icon>
        <ArrowTrendingUpIcon class="w-6 h-6 text-black dark:text-white" />
      </template>
    </single-button-group>
    <single-button-group title="التنبيهات" name="notifications">
      <template #icon>
        <BellIcon class="w-6 h-6 text-black dark:text-white" />
        <span
          class="absolute -top-[2px] -right-[2px] bg-black dark:bg-blue-700 dark:text-white rounded-lg text-white w-4 h-4 flex items-center justify-center text-[10px] font-[500]"
          >3</span
        >
      </template>
    </single-button-group>
    <single-button-group title="المقايضة" name="exchange">
      <template #icon>
        <ArrowsRightLeftIcon class="w-6 h-6 text-black dark:text-white" />
      </template>
    </single-button-group>
    <single-button-group title="الملف الشخصي" name="personal_profile">
      <template #icon>
        <UserIcon class="w-6 h-6 text-black dark:text-white" />
      </template>
    </single-button-group>
  </div>
  <!-- </div> -->
</template>

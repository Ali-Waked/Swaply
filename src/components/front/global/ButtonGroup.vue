<script setup >
import { ArrowTrendingUpIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import { ArrowsRightLeftIcon, UserIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/outline";
// import { CircleIcon } from "@heroicons/vue/24/outline";
import { BellIcon } from "@heroicons/vue/24/outline";
import SingleButtonGroup from "./SingleButtonGroup.vue";
import { inject, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

// const buttonGroup = ref("buttonGroup");

const emitter = inject("emitter");

const isFixed = ref(false);
const buttonGroup = ref(null);
const topValue = ref("80px");
let initialOffset = 0;
const route = useRoute();

const handleScroll = () => {
  if (route.name == "personal_profile") {
    console.log("hi");
    return;
  }
  const scrollY = window.scrollY;
  // لو نزلنا أكثر من مكان العنصر الأصلي - 20px، خليه fixed
  isFixed.value = scrollY >= 80;
  console.log(scrollY, scrollY >= initialOffset - 20);
};

// const handleScroll = () => {
//   if (!buttonGroup.value) return;
//   const rect = buttonGroup.value.getBoundingClientRect();
//   // إذا وصل للأعلى أقل من 20px خليه fixed
//   isFixed.value = rect.top <= 20;
// };

onMounted(() => {
  emitter.on("hiddenButton", (event) => {
    if (event) {
      buttonGroup.value.style.zIndex = "1";
      return;
    }
    if (buttonGroup.value) {
      // احفظ مكان العنصر الأصلي
      initialOffset = buttonGroup.value.offsetTop;
    }

    buttonGroup.value.style.zIndex = "100000";
  });
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <!-- <div class="h-[58px] mb-8"> -->
  <div
    ref="buttonGroup"
    class="flex items-center justify-center shoadow-lg bg-white rounded-lg overflow-hidden space-x-4 dark:bg-gray-800 shadow-md flex-1 p-0 left-0 right-0 z-[10000000] mx-auto w-fit"
    :class="[
      isFixed || route.name === 'personal_profile'
        ? 'fixed top-2'
        : 'absolute top-20',
    ]"
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

<script setup>
import { CheckIcon, StarIcon } from "@heroicons/vue/24/solid";
import MdiIcon from "./MdiIcon.vue";
import { mdiNavigationOutline } from "@mdi/js";

defineProps({
  storeName: String,
  isCertified: Boolean,
  price: Number,
  rating: Number,
  usdPrice: Number,
  lastUpdate: String,
  distance: Number,
});
</script>

<template>
  <div class="border p-6 rounded-xl mb-2">
    <div class="flex justify-between items-center font-[400] text-[24px]">
      <div class="flex gap-2 items-center font-[400] text-[24px]">
        <span>{{ storeName }}</span>
        <span
          class="cursor-default border rounded-lg text-gray-700 gap-[2px] text-[10px] py-1 pr-1 flex items-center"
          v-if="isCertified"
        >
          <span>معتمد</span>
          <CheckIcon class="w-4 h-4" />
        </span>
      </div>
      <span>{{ price }}</span>
    </div>
    <div class="flex items-center justify-between text-gray-700 font-[400]">
      <span class="flex items-center gap-2 mt-3">
        <span class="">{{ rating }}</span>
        <StarIcon class="w-5 h-5 text-amber-400" />
      </span>
      <span>{{ usdPrice }}</span>
    </div>
    <div class="flex justify-between items-center mt-4">
      <span
        class="text-[12px] rounded-lg px-4 py-[6px] cursor-default"
        :class="{
          'text-amber-700 font-[400] bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400':
            priceType == 'سعر عادل',
          'text-green-700 font-[400] bg-green-50 dark:bg-green-900/30 dark:text-green-400':
            priceType == 'سعر جيد',
          'text-red-700 font-[400] bg-red-50 dark:bg-red-900/30 dark:text-red-400':
            priceType == 'سعر مرتفع',
        }"
      >
        {{ priceType }}
      </span>
      <div class="flex items-center gap-1 text-gray-500 font-[400]">
        <span>
          {{ distance }}
          كم
        </span>
        <span>
          <MdiIcon
            :icon="mdiNavigationOutline"
            class="text-gray-600 dark:text-gray-300"
          />
        </span>
      </div>
    </div>
    <div class="text-gray-500 text-[12px] mt-2 font-[400]">
      <span>اخر تحديث: </span>
      <span>{{ lastUpdate }}</span>
    </div>
  </div>
</template>
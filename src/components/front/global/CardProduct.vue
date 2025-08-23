<script setup>
import {
  ClockIcon,
  FireIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="border rounded-[18px] text-gray-700 dark:text-gray-200 overflow-hidden z-[100000000000000000] cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:shadow-md dark:border-gray-700"
  >
    <!-- Image container -->
    <div class="bg-gray-100 dark:bg-gray-700/30 py-4 px-6">
      <img :src="image" class="w-[250px]" alt="product image" />
    </div>

    <!-- Content -->
    <div class="p-4">
      <div class="flex items-center gap-4 font-[500] mb-1 text-[18px]">
        <span class="title">{{ name }}</span>
        <span class="price">{{ price }}</span>
      </div>

      <p class="description mb-1 text-gray-500 dark:text-gray-400 text-[14px]">
        {{ description }}
      </p>

      <div class="store-name flex items-center gap-1 mb-1">
        <MapPinIcon class="w-[12px] h-[12px]" />
        <span class="text-[12px] font-[400] dark:text-gray-300">{{
          storeName
        }}</span>
      </div>

      <div class="time flex items-center justify-between">
        <div class="time flex items-center gap-1">
          <ClockIcon class="w-[12px] h-[12px]" />
          <span class="text-[12px] dark:text-gray-300">{{ time }}</span>
        </div>
        <FireIcon class="w-5 text-orange-600" />
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup>
import {
  ClockIcon,
  FireIcon,
  MapIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/vue/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/vue/24/solid";

import format from "../../../mixins/formats";
import { inject, ref, watch } from "vue";

const { currencyFormat } = format();

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    // required: true,
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
  // isFavorite: {
  //   type: Boolean,
  //   default: false,
  // },
});
const emitter = inject("emitter");
const isFavorite = ref(false);

watch(isFavorite, (newVal) => {
  if (newVal) {
    emitter.emit("showNotificationAlert", [
      "success",
      "تم اضافة المنتج الى المفضلة!",
    ]);
  } else {
    emitter.emit("showNotificationAlert", [
      "error",
      "تم حذف المنتج من المفضلة!",
    ]);
  }
});
</script>

<template>
  <div
    class="border rounded-[18px] text-gray-700 dark:text-gray-200 overflow-hidden z-[100000000000000000] cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:shadow-md dark:border-gray-700"
  >
    <!-- Image container -->
    <div class="bg-gray-300/70 dark:bg-gray-700/30 py-4 px-6 relative group">
      <img :src="image" class="w-[250px]" alt="product image" />
      <StarSolidIcon
        @click.stop="isFavorite = false"
        class="w-6 absolute top-3 -right-20 transition-all duration-300 group-hover:right-3 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
        v-if="isFavorite"
      />

      <StarIcon
        @click.stop="isFavorite = true"
        class="w-6 absolute top-3 -right-20 transition-all duration-300 group-hover:right-3 text-red-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-gray-200"
        v-else
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <div class="flex items-center gap-4 font-[500] mb-1 text-[18px]">
        <span class="title flex-1">{{ name }}</span>
        <span class="price">{{
          currencyFormat(price, undefined, "ar", "ILS")
        }}</span>
      </div>

      <div class="flex items-center justify-between">
        <p
          class="description mb-1 text-gray-500 dark:text-gray-400 text-[14px]"
        >
          {{ description }}
        </p>
        <span class="line-through" v-if="oldPrice">
          {{ currencyFormat(oldPrice, undefined, "ar", "ILS") }}
        </span>
      </div>

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
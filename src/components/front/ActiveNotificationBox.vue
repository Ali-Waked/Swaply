<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

defineProps({
  title: {
    type: String,
  },
  whenRun: String,
  isActive: Boolean,
  alerted: Boolean,
});
const box = ref(null);
</script>
<template>
  <div
    class="flex justify-between items-center bg-gray-100 dark:bg-gray-700 mb-3 rounded-[16px] p-3 pl-8 pr-4"
    ref="box"
  >
    <div>
      <div class="flex">
        <span
          class="title text-gray-900 dark:text-white font-[500] text-[16px] mb-1 block"
        >
          {{ title }}
        </span>
        <span class="status flex items-center gap-2 mr-2">
          <span
            class="active bg-black dark:bg-green-600 rounded font-[500] text-[12px] text-white py-[5px] px-[18px] cursor-pointer transition-opacity hover:opacity-70"
            v-if="isActive"
            @click="$emit('update:isActive', false)"
          >
            نشط
          </span>
          <span
            class="in-active bg-gray-200 dark:bg-gray-600 rounded font-[500] text-[12px] text-black dark:text-white py-[5px] px-[18px] cursor-pointer transition-opacity hover:opacity-70"
            v-else
            @click="$emit('update:isActive', true)"
          >
            متوقف
          </span>
          <span
            class="alerted bg-red-600 rounded font-[500] text-[12px] text-white py-[5px] px-2 cursor-default select-none"
            v-if="alerted"
          >
            تم التنبيه
          </span>
        </span>
      </div>
      <span
        class="text-gray-600 dark:text-gray-300 font-[400] text-[14px] block"
      >
        {{ whenRun }}
      </span>
    </div>
    <XMarkIcon
      class="w-6 h-6 text-gray-600 dark:text-gray-300 transition-all cursor-pointer hover:text-gray-900 dark:hover:text-white"
      @click="box.remove()"
    />
  </div>
</template>
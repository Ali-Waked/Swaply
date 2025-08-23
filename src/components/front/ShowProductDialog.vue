<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog
      @close="closeDialog"
      class="relative overflow-visible z-[100000000]"
    >
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/30 dark:bg-black/60"
        aria-hidden="true"
      />

      <div
        class="fixed inset-0 flex items-center justify-center overflow-y-auto scrollbar-hide py-6 pt-44"
      >
        <DialogPanel
          class="w-full max-w-md bg-white rounded-xl dark:bg-gray-800 relative shadow-lg"
        >
          <DialogTitle class="mb-3 px-6 pt-12 pb-1">
            <h3
              class="title font-[500] text-[24px] text-gray-800 dark:text-white"
            >
              تفاصيل المنتج
            </h3>
          </DialogTitle>

          <!-- صورة -->
          <div
            class="imag flex justify-center items-center bg-gray-100 dark:bg-gray-700 p-4 py-8"
          >
            <img :src="data.image" class="max-w-[180px]" :alt="data.name" />
          </div>

          <div class="p-6 pt-5">
            <!-- الاسم والسعر -->
            <div
              class="flex items-center justify-between font-[400] text-[24px] text-gray-800 dark:text-gray-100 mb-1"
            >
              <span class="name">{{ data.name }}</span>
              <span class="price">{{ data.price }}</span>
            </div>

            <!-- الوصف -->
            <div
              class="flex items-center justify-between text-gray-400 dark:text-gray-300"
            >
              <span class="name">{{ data.description }}</span>
              <span class="price">{{ data.usdPrice }}</span>
            </div>

            <!-- التقييم -->
            <div class="flex justify-between mt-1 items-center">
              <span class="flex items-center gap-2">
                <span
                  class="font-[400] text-gray-800 dark:text-gray-100 text-[28px]"
                >
                  {{ data.rating }}
                </span>
                <StarIcon class="text-amber-400 w-8 h-8" />
              </span>
              <span
                class="text-[12px] rounded-lg px-4 py-[6px] cursor-default text-amber-700 font-[400] bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400"
              >
                سعر عادل
              </span>
            </div>

            <!-- المسافة -->
            <div>
              <span
                class="text-gray-800 dark:text-gray-100 font-[400] block text-[20px] mt-2"
              >
                المسافة
              </span>
              <span
                class="text-gray-600 dark:text-gray-300 font-[400] flex items-center gap-1"
              >
                <MdiIcon
                  :icon="mdiNavigationOutline"
                  class="text-gray-600 dark:text-gray-300"
                />
                <span>{{ data.distance }}</span>
              </span>
            </div>

            <!-- اخر تحديث -->
            <div>
              <span
                class="text-gray-800 dark:text-gray-100 font-[400] block text-[20px] mt-2"
              >
                اخر تحديث
              </span>
              <div
                class="flex items-center text-[14px] mt-1 text-gray-600 dark:text-gray-300 gap-1"
              >
                <ClockIcon class="w-4 h-4" />
                <span>{{ data.time }}</span>
              </div>
            </div>

            <!-- فاصل -->
            <span
              class="block w-full h-[2px] bg-gray-100 dark:bg-gray-700 my-4"
            />

            <!-- زر الابلاغ -->
            <button
              class="flex items-center justify-center w-full py-2 border-2 rounded-lg border-red-600 text-red-600 gap-2 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-400"
            >
              <MdiIcon
                class="text-red-600 dark:text-red-400"
                :icon="mdiFlagOutline"
              />
              <span>ابلاغ عن غلاء الاسعار</span>
            </button>

            <!-- زر تم الابلاغ -->
            <button
              class="flex items-center justify-center w-full py-2 border-2 rounded-lg border-red-600 text-white gap-2 bg-red-600 mt-2 dark:border-red-500 dark:bg-red-500"
            >
              <MdiIcon class="text-white" :icon="mdiFlagOutline" />
              <span>تم الابلاغ</span>
            </button>
          </div>

          <!-- زر الإغلاق -->
          <div class="absolute top-[20px] right-[20px]">
            <span
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-all cursor-pointer"
            >
              <XMarkIcon class="h-5 w-5" @click="closeDialog()" />
            </span>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "vue";
import { ClockIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { CameraIcon } from "@heroicons/vue/24/outline";
import {
  TransitionRoot,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import HeaderTitle from "./global/HeaderTitle.vue";
import FormControl from "./global/FormControl.vue";
import MainButton from "./global/MainButton.vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import { mdiFlagOutline, mdiNavigationOutline } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  data: { type: Object },
});

const emit = defineEmits(["update:modelValue"]);
// const emitter = inject("emitter");

function closeDialog() {
  emit("update:modelValue", false);
}
</script>


<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
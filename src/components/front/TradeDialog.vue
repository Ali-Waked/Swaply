<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog @close="closeDialog" class="relative z-50">
      <!-- الخلفية -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- صندوق الـ Dialog -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          class="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg relative"
        >
          <DialogTitle class="pt-6 mb-3">
            <h3 class="title font-[500] text-[20px]">اضافة عرض مقايضة</h3>
            <p class="subtitle font-[400] text-gray-600 mt-1 text-[14px]">
              اضف تفاصيل عرض المقاي ضة الخاص بك
            </p>
          </DialogTitle>
          <FormControl label="ماذا تعرض؟" id="ماذا تعرض؟" />
          <FormControl
            label="ماذا تريد؟"
            id="ماذا تريد؟"
            placeholder="مثال: حليب اطفال"
          />
          <FormControl
            label="الوصف"
            id="الوصف"
            placeholder="تفاصيل اضافية عن العرض"
            type="textarea"
          />
          <FormControl
            label="الموقع"
            id="الموقع"
            placeholder="المنطقة او الحي"
          />
          <div class="mb-3">
            <label
              for="file_image"
              class="flex items-center gap-2 cursor-pointer justify-center border border-gray-300 dark:border-gray-600 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:border-gray-500 active:ring-gray-500 rounded-md"
            >
              <CameraIcon class="w-4 h-4 text-gray-600" />
              <span class="font-[400]">اضافة صورة</span>
            </label>
            <input type="file" id="file_image" hidden />
          </div>
          <MainButton label="نشر العرض" />
          <div class="absolute top-[20px] right-[20px]">
            <span
              class="text-gray-600 hover:text-gray-800 transition-all cursor-pointer"
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
import { XMarkIcon } from "@heroicons/vue/24/outline";
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

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(["update:modelValue"]);
// const emitter = inject("emitter");

function closeDialog() {
  emit("update:modelValue", false);
}
</script>

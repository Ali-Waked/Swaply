<!-- SwapOfferModal.vue -->
<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog @close="closeDialog" class="relative z-50">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- Container scrollable -->
      <div
        class="fixed inset-0 flex items-center justify-center p-4 overflow-auto"
      >
        <DialogPanel
          class="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg relative max-h-[90vh] overflow-auto shadow-lg"
        >
          <!-- Close button -->
          <div class="absolute top-4 right-4">
            <span
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white cursor-pointer transition-all"
              @click="closeDialog"
            >
              <XMarkIcon class="w-5 h-5" />
            </span>
          </div>

          <!-- Title -->
          <DialogTitle class="pt-6 mb-4">
            <h3 class="font-medium text-lg text-black dark:text-white">
              اضافة عرض مقايضة
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">
              اضف تفاصيل عرض المقايضة الخاص بك
            </p>
          </DialogTitle>

          <!-- Form Fields -->
          <div class="space-y-4">
            <FormControl label="ماذا تعرض؟" placeholder="مثال: 5 لتر بنزين" />
            <FormControl label="ماذا تريد؟" placeholder="مثال: حليب اطفال" />
            <FormControl
              label="الوصف"
              placeholder="تفاصيل اضافية عن العرض"
              type="textarea"
            />
            <FormControl label="الموقع" placeholder="المنطقة او الحي" />

            <!-- Product Details -->
            <ProductDetailsForm />

            <!-- File input -->
            <div>
              <label
                for="file_image"
                class="flex items-center gap-2 cursor-pointer justify-center border border-gray-300 dark:border-gray-600 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-md"
              >
                <CameraIcon class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span class="dark:text-white">اضافة صورة</span>
              </label>
              <input type="file" id="file_image" hidden />
            </div>

            <!-- Submit Button -->
            <MainButton label="نشر العرض" class="py-3" />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { XMarkIcon, CameraIcon } from "@heroicons/vue/24/outline";
import {
  TransitionRoot,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import FormControl from "./global/FormControl.vue";
import MainButton from "./global/MainButton.vue";
import ProductDetailsForm from "./global/ProductDetailsForm.vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(["update:modelValue"]);

function closeDialog() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
/* Scrollbar للـ modal */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 3px;
}
</style>

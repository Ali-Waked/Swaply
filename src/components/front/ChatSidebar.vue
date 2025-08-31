<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const emit = defineEmits(["update:modelValue"]);

watch(
  dialog,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <!-- <div class="h-screen overflow-hidden"> -->
  <!-- الشريط الجانبي -->
  <div
    class="scrollbar-hide overflow-auto h-screen fixed top-0 w-[400px] bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 z-[1000] pt-8"
    :class="{ '-right-full': !dialog, 'right-0': dialog }"
  >
    <!-- العنوان -->
    <div
      class="text-center font-[500] text-[24px] mb-4 text-blue-600 dark:text-blue-400"
    >
      محادثاتك
    </div>

    <!-- قائمة المحادثات -->
    <div>
      <template v-for="n in 20" :key="n">
        <div
          class="flex items-center px-4 gap-4 last-of-type:border-none border-b border-gray-200 dark:border-gray-700 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          @click="$emit('chatWith')"
        >
          <div
            class="image bg-blue-500 dark:bg-blue-700 text-white font-[500] w-12 h-12 rounded-full flex items-center justify-center"
          >
            اح
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-900 dark:text-gray-100 font-[400]"
              >الحمد محمود</span
            >
            <span class="text-gray-500 dark:text-gray-400 text-[14px]"
              >كيف حالك ي عم؟</span
            >
          </div>
          <span class="flex-1" />
          <div class="self-end text-[12px] text-gray-400 dark:text-gray-500">
            <span>منذ 20 دقيقة</span>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- overlay -->
  <div
    class="bg-black/30 fixed top-0 left-0 w-screen h-screen z-[900] transition-opacity"
    :class="{ hidden: !dialog }"
    @click="dialog = false"
  ></div>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup >
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    default: "تعديل",
  },
  inputType: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:value"]);

const localValue = computed({
  get() {
    return props.value;
  },
  set(newVal) {
    emit("update:value", newVal);
  },
});

const displayValue = computed(() => {
  return props.inputType === "password"
    ? "*".repeat(props.value.length)
    : props.value;
});

const isEdit = ref(false);
</script>

<template>
  <div
    class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 dark:border-gray-700"
  >
    <!-- Label -->
    <span
      class="text-gray-600 dark:text-gray-300 font-[500] text-[14px] mb-3 block"
    >
      {{ label }}
    </span>

    <!-- Edit Mode -->
    <div v-if="isEdit" class="flex items-center gap-4 mt-3">
      <input
        :type="inputType"
        v-model="localValue"
        class="rounded-md w-full p-[6px] block placeholder:text-[14px] font-[500] bg-gray-100 text-black focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-400 dark:focus:ring-gray-400"
      />
      <div class="action flex justify-end gap-1">
        <span
          class="cursor-pointer w-9 h-7 rounded-md flex items-center justify-center active:bg-gray-200 dark:active:bg-gray-600"
        >
          <CheckIcon class="w-5 h-5" />
        </span>
        <span
          class="cursor-pointer w-9 h-7 rounded-md flex items-center justify-center active:bg-gray-200 dark:active:bg-gray-600"
          @click="isEdit = false"
        >
          <XMarkIcon class="w-5 h-5" />
        </span>
      </div>
    </div>

    <!-- Display Mode -->
    <div
      v-else
      class="font-[500] flex items-center justify-between text-black dark:text-white"
    >
      <p>{{ displayValue }}</p>
      <button
        @click="isEdit = true"
        class="w-fit border rounded-lg py-2 px-4 text-[12px] font-[500] transition border-gray-200 hover:bg-gray-100 focus:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>
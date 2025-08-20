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
    class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0"
  >
    <span class="text-gray-600 font-[500] text-[14px] mb-3">{{ label }}</span>
    <div v-if="isEdit" class="flex items-center gap-4 mt-3">
      <input
        :type="inputType"
        v-model="localValue"
        class="focus:border-gray-500 focus:ring-gray-500 rounded-md w-full p-[6px] bg-gray-100 block placeholder:text-[14px] font-[500]"
      />
      <div class="action flex justify-end gap-1">
        <span
          class="cursor-pointer w-9 h-7 rounded-md active:bg-gray-200 flex items-center justify-center"
        >
          <CheckIcon class="w-5 h-5" />
        </span>
        <span
          class="cursor-pointer w-9 h-7 rounded-md active:bg-gray-200 flex items-center justify-center"
          @click="isEdit = false"
        >
          <XMarkIcon class="w-5 h-5" />
        </span>
      </div>
    </div>
    <div v-else class="font-[500] text-black flex items-center justify-between">
      <p class="">{{ displayValue }}</p>
      <button
        @click="isEdit = true"
        class="w-fit border border-gray-200 rounded-lg py-2 px-4 hover:bg-gray-100 focus:bg-gray-100 text-[12px] text-black font-[500] transition"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>
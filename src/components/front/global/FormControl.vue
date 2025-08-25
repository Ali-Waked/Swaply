<template>
  <div class="mb-3">
    <!-- <label :for="id" class="block font-[400] mb-2 text-black dark:text-white">{{
      label
    }}</label> -->
    <MainLabel :id="id" :label="label" />

    <textarea
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :required="isRequired"
      class="focus:border-gray-500 focus:ring-gray-500 rounded-md resize-none bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400 h-[90px]"
    ></textarea>

    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :required="isRequired"
      class="block w-full rounded-md placeholder:text-[14px] placeholder:font-[400]"
      :class="{
        'border-red-600 focus:border-red-500 dark:text-white focus:ring-red-600 bg-red-100/70':
          errorMessage,
        'focus:border-gray-500 dark:text-white focus:ring-gray-500  bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400':
          !errorMessage,
      }"
    />
    <small class="text-red-600 font-[400]">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import MainLabel from "./MainLabel.vue";

defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
});
</script>

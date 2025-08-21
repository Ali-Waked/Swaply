<template>
  <div class="mb-3">
    <label :for="id" class="block font-[400] mb-2 text-black dark:text-white">{{
      label
    }}</label>

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
      class="focus:border-gray-500 focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
    />
  </div>
</template>

<script setup>
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
  isRequired: {
    type: Boolean,
    default: true,
  },
});
</script>

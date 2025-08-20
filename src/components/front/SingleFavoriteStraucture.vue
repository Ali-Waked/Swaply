<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>


<template>
  <div
    class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 flex items-center justify-between"
  >
    <div>
      <span class="text-black font-[500] text-[16px] mb-1 block">{{
        title
      }}</span>
      <span class="text-gray-600 font-[500] text-[14px] mb-2 block">{{
        description
      }}</span>
    </div>
    <div>
      <slot name="action" />
    </div>
  </div>
</template>
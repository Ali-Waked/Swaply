<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <button
    class="flex-1 flex items-center gap-3 w-full text-black justify-center p-[6px] border-2 hover:bg-gray-100 transition-all border-gray-300 rounded-lg text-[14px]"
  >
    <slot name="icon" />
    <span class="font-[500] text-[13px]">{{ title }}</span>
  </button>
</template>
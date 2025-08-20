<script setup >
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="bg-black text-white flex w-full items-center justify-center p-2 hover:bg-[#000000db] transition-all rounded-lg"
  >
    <slot name="icon" />
    <span class="font-[500]">{{ label }}</span>
  </button>
</template>
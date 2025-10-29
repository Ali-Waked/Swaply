<script setup>
defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <small class="text-red-600 font-[400] opacity" dir="rtl" v-if="errorMessage">{{
    errorMessage
  }}</small>
</template>
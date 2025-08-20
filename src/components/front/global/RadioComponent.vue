<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:selected"]);
const localSelected = computed({
  get() {
    return props.selected;
  },
  set(value) {
    emit("update:selected", value);
  },
});
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <div v-for="item in items" :key="item.id">
      <input
        type="radio"
        :name="name"
        :id="item.id"
        :value="item.id"
        v-model="localSelected"
        class="hidden"
      />
      <label
        :for="item.id"
        :class="{
          'rounded-md px-[14px] py-[6px] cursor-pointer font-[400] text-[14px]': true,
          'bg-black text-white dark:bg-blue-700 dark:text-white':
            localSelected === item.id,
          'text-black bg-white border border-gray-200 hover:bg-gray-200 transition dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700':
            localSelected !== item.id,
        }"
      >
        {{ item.label }}
      </label>
    </div>
  </div>
</template>
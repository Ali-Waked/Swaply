<script setup>
import { ref, computed, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "ابحث عن اي منتج... (خبز, ارز, حليب)",
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

const selectedItem = ref(props.modelValue);

const query = ref("");

watch(selectedItem, (val) => {
  emit("update:modelValue", val);
});

const filteredItems = computed(() => {
  if (!query.value) return props.items;
  return props.items.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

const searchFor = () => {
  emit("search", query.value);
};
</script>

<template>
  <Combobox v-model="selectedItem" @keyup.enter="searchFor">
    <div class="relative mt-1">
      <!-- Input -->
      <ComboboxInput
        v-model="query"
        class="focus:border-blue-400 py-3 bg-transparent text-gray-900 dark:text-white focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
        :placeholder="placeholder"
      />

      <!-- Options -->
      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 shadow-lg"
      >
        <ComboboxOption
          v-for="item in filteredItems"
          :key="item.id"
          :value="item"
          v-slot="{ active, selected }"
        >
          <li
            class="cursor-pointer select-none py-2 px-3"
            :class="[
              active
                ? 'bg-blue-500 dark:bg-gray-600 text-white'
                : 'text-gray-900 dark:text-gray-200',
              selected ? 'bg-gray-200 dark:bg-blue-700 text-gray-600' : '',
            ]"
          >
            {{ item.name }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>



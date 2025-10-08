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
  // console.log(val);
  query.value = val?.name || "";
});

const filteredItems = computed(() => {
  if (!query.value) return props.items;
  return props.items.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

// const filteredItems = computed(() => {
//   if (!query.value) return props.items;
//   return props.items.filter((item) =>
//     item.name.toLowerCase().includes(query.value.toLowerCase())
//   );
// });

const searchFor = () => {
  emit("search", query.value);
};
</script>

<template>
  <Combobox
    v-model="selectedItem"
    @keyup.enter="searchFor"
    :by="(item) => item?.id ?? null"
  >
    <div class="relative mt-1">
      <!-- Input -->
      <ComboboxInput
        @change="query = $event.target.value"
        class="focus:border-blue-400 py-3 bg-transparent text-gray-900 dark:text-white focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
        :placeholder="placeholder"
        v-model="query"
        :display-value="(item) => item?.name || query"
      />

      <!-- Options -->
      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md text-black bg-white dark:bg-gray-800 shadow-lg border-[1px] border-gray-400 custom-scroll"
      >
        <ComboboxOption
          v-for="item in filteredItems"
          :key="item.id"
          :value="item"

        >
          <li
            class="cursor-pointer py-2 px-3 bg-gray-100 text-black dark:text-white  dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700
            "
          >
            {{ item.name }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>



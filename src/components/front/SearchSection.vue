<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { computed, ref } from "vue";

const search = ref(null);

const items = [
  { id: 1, name: "بيض" },
  { id: 2, name: "حليب" },
  { id: 3, name: "رز" },
  { id: 4, name: "كفتة" },
];
const query = ref("");
const filteredItems = computed(() =>
  query.value === ""
    ? items
    : items.filter((item) =>
        item.name.toLowerCase().includes(query.value.toLowerCase())
      )
);
</script>

<template>
  <div class="search mt-6">
    <Combobox v-model="search">
      <div class="relative mt-1">
        <!-- input -->
        <ComboboxInput
          class="focus:border-blue-400 py-3 bg-transparent text-gray-900 dark:text-white focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
          @change="query = $event.target.value"
          placeholder="ابحث عن اي منتج... (خبز, ارز, حليب)"
          :displayValue="(item) => item?.name"
        />
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
    <div class="suggestion flex items-center mt-2">
      <span class="text-[12px] text-gray-400 font-[400] mx-4">مقترح:</span>
      <ul class="flex items-center gap-1">
        <li
          class="bg-blue-50 text-blue-600 text-[12px] block py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-lg"
        >
          بقوليات
        </li>
        <li
          class="bg-blue-50 text-blue-600 text-[12px] block py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-lg"
        >
          مواد تنظيف
        </li>
        <li
          class="bg-blue-50 text-blue-600 text-[12px] block py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-lg"
        >
          صناعات
        </li>
        <li
          class="bg-blue-50 text-blue-600 text-[12px] block py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-lg"
        >
          اغراض منزلية
        </li>
      </ul>
    </div>
  </div>
</template>
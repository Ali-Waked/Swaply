<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const search = ref(null);
const router = useRouter();

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
const suggestion = ["بقوليات", " مواد تنظيف", "صناعات", "اغراض منزلية"];
const searchFor = () => {
  if (search.value.name) {
    router.push({
      name: "search-map",
      query: { for: search.value.name, id: search.value.id },
    });
  }
};
const suggestionClick = (value) => {
  console.log("hi");
  search.value = value;
};
</script>

<template>
  <div class="search mt-6">
    <Combobox v-model="search" @keyup.enter="searchFor">
      <div class="relative mt-1">
        <!-- input -->
        <ComboboxInput
          class="focus:border-blue-400 py-3 bg-transparent text-gray-900 dark:text-white focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
          @change="query = $event.target.value"
          placeholder="ابحث عن اي منتج... (خبز, ارز, حليب)"
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
          class="text-blue-800 bg-blue-200 dark:bg-blue-600/30 dark:text-blue-400 text-[12px] block py-1 px-3 cursor-pointer hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all rounded-lg"
          v-for="value in suggestion"
          :key="value"
          @click="suggestionClick(value)"
        >
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>
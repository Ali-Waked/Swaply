<script setup>
import { reactive } from "vue";
import MdiIcon from "../MdiIcon.vue";
import FooterColumn from "./FooterColumn.vue";
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiWeb,
  mdiYoutube,
} from "@mdi/js";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";

const langSelected = reactive({ id: 1, name: "العربية", value: "ar" });

const langs = [
  { id: 1, name: "العربية", value: "ar" },
  { id: 2, name: "english", value: "en" },
];

const columnsData = [
  {
    groupTitle: "روابط سريعة",
    items: [
      { text: "الصفحة الرئيسية" },
      { text: "الاسعار" },
      { text: "التنبيهات" },
      { text: "العروض" },
      { text: "الملف الشخصي" },
    ],
  },
  {
    groupTitle: "معلومات تقنية",
    items: [
      { text: "حالة النظام" },
      { text: "المطورين" },
      { text: "التحديثات" },
    ],
  },
  {
    groupTitle: "اخرى",
    items: [
      { text: "حول المنصة" },
      { text: "سياسة الخصوصية" },
      { text: "شروط الاستخدام" },
      { text: "تواصل معنا" },
    ],
  },
];
</script>
<template>
  <footer class="container grid grid-cols-4 gap-3 px-6 py-12">
    <div>
      <!-- Logo -->
      <div class="logo">
        <span class="font-[700] text-4xl text-blue-600 dark:text-blue-400"
          >نبض</span
        >
      </div>

      <!-- Language selector -->
      <div class="lang flex items-center mt-4">
        <div class="icon mb-2 ml-1">
          <MdiIcon :icon="mdiWeb" class="text-gray-700 dark:text-gray-300" />
        </div>
        <Listbox v-model="langSelected">
          <div class="relative w-32 h-10">
            <ListboxButton
              v-slot="{ open }"
              class="w-full h-8 flex items-center border border-gray-600 justify-between rounded-md bg-gray-100 dark:bg-gray-700 py-3 px-3 text-gray-900 dark:text-white"
            >
              <span>{{ langSelected.name }}</span>
              <ChevronUpIcon
                class="w-5 h-5 text-gray-500 dark:text-gray-300 mt-2"
                v-if="open"
              />
              <ChevronDownIcon
                class="w-5 h-5 text-gray-500 dark:text-gray-300 mt-2"
                v-else
              />
            </ListboxButton>
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 shadow-lg"
            >
              <ListboxOption
                v-for="option in langs"
                :key="option.id"
                :value="option"
                v-slot="{ active, selected }"
              >
                <li
                  class="cursor-pointer select-none py-2 px-3"
                  :class="[
                    active
                      ? 'bg-blue-600 dark:bg-gray-600 text-white'
                      : 'text-gray-900 dark:text-gray-200',
                    selected
                      ? 'bg-gray-200 dark:bg-blue-700 text-gray-600 dark:text-white'
                      : '',
                  ]"
                >
                  {{ option.name }}
                </li>
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      <!-- Social icons -->
      <div class="icons flex gap-2 mt-4">
        <a
          href="http://x.com"
          target="_blank"
          class="transition-all hover:rotate-[360deg]"
        >
          <MdiIcon
            class="text-gray-400 dark:text-gray-300"
            :icon="mdiTwitter"
          />
        </a>
        <a
          href="http://facebook.com"
          target="_blank"
          class="transition-all hover:rotate-[360deg]"
        >
          <MdiIcon
            class="text-gray-400 dark:text-gray-300"
            :icon="mdiFacebook"
          />
        </a>
        <a
          href="http://youtube.com"
          target="_blank"
          class="transition-all hover:rotate-[360deg]"
        >
          <MdiIcon
            class="text-gray-400 dark:text-gray-300"
            :icon="mdiYoutube"
          />
        </a>
        <a
          href="http://instagram.com"
          target="_blank"
          class="transition-all hover:rotate-[360deg]"
        >
          <MdiIcon
            class="text-gray-400 dark:text-gray-300"
            :icon="mdiInstagram"
          />
        </a>
      </div>
    </div>

    <!-- Footer columns -->
    <template v-for="column in columnsData" :key="column">
      <FooterColumn :data="column" class="dark:text-gray-200" />
    </template>
  </footer>
</template>
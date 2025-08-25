<script setup >
import { FunnelIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";
import ButtonTab from "../../ButtonTab.vue";
import { onMounted, ref, watch } from "vue";
import { ListBulletIcon } from "@heroicons/vue/24/solid";
import SelectListBox from "../SelectListBox.vue";
import HeaderPage from "../HeaderPage.vue";
import LogoSection from "../LogoSection.vue";

const isListStorePage = ref(false);
const router = useRouter();
const route = useRoute();
const search = ref("");

watch(
  () => router.currentRoute.value.name,
  (newVal) => {
    if (newVal == "search-list-stores") {
      isListStorePage.value = true;
    } else {
      isListStorePage.value = false;
    }
  }
);

const priceOptions = [
  { id: 1, name: "حسب السعر", value: "ar" },
  { id: 2, name: "حسب المسافة", value: "en" },
  { id: 3, name: "حسب التقييم", value: "ek" },
];
const dependentPrice = ref({ id: 1, name: "حسب السعر", value: "ar" });

const categoriesOptions = [
  { id: 1, name: "جميع الفئات", value: "all" },
  { id: 2, name: "مواد اساسية", value: "pk" },
  { id: 3, name: "مواد غذائية", value: "fk" },
  { id: 4, name: "ادوية", value: "ek" },
];
const dependentCategories = ref({ id: 1, name: "جميع الفئات", value: "all" });

const updateRoute = () => {};

const searchFor = () => {
  const query = {
    dependent: dependentPrice.value.name,
    categories: dependentCategories.value.name,
  };
  console.log(query);
  router.replace({
    name: router.currentRoute.value.name,
    query: { ...route.query, ...query },
  });

  // updateRoute();
};

onMounted(() => {
  search.value = route.query.for;
  if (route.name == "search-list-stores") {
    isListStorePage.value = true;
  } else {
    isListStorePage.value = false;
  }
  const query = {};
  const dependent = priceOptions.find((el) => el.name == route.query.dependent);
  if (dependent) {
    dependentPrice.value = dependent;
  }
  const categories = categoriesOptions.find(
    (el) => el.name == route.query.categories
  );
  if (categories) {
    dependentCategories.value = categories;
  }
  console.log("categoru", categories);
});
</script>

<template>
  <HeaderPage>
    <LogoSection />
  </HeaderPage>
  <!-- العنوان -->
  <div
    class="flex items-center gap-2 text-[24px] text-gray-700 dark:text-white font-[500]"
  >
    <span>نتائج البحث:</span>
    <span>{{ search }}</span>
  </div>

  <!-- الفلاتر -->
  <div class="filter flex items-center gap-2 my-4">
    <SelectListBox v-model="dependentPrice" :options="priceOptions" />
    <SelectListBox v-model="dependentCategories" :options="categoriesOptions" />
    <div
      class="border search-button rounded-lg py-[6px] relative px-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
      @click="searchFor()"
    >
      <FunnelIcon class="w-6" />
      <span
        class="absolute -top-7 left-1/2 hidden -translate-x-1/2 bg-gray-500/50 text-[12px] px-2 py-1 font-[500] rounded-md text-white transition-all"
      >
        بحث
      </span>
    </div>
  </div>

  <!-- أزرار العرض -->
  <div
    class="buttons bg-gray-200 dark:bg-gray-700 p-[2px] rounded-[12px] text-[16px] flex items-center gap-2 mb-4"
  >
    <ButtonTab
      label="قائمة"
      :is-active="isListStorePage"
      @click="
        router.replace({
          name: 'search-list-stores',
          query: route.query,
        })
      "
      class="py-2 rounded-[11px]"
      :icon="ListBulletIcon"
    />
    <ButtonTab
      label="خريطة"
      :is-active="!isListStorePage"
      @click="
        router.replace({
          name: 'search-map',
          query: route.query,
        })
      "
      class="py-2 rounded-[11px]"
      :icon="MapPinIcon"
    />
  </div>

  <!-- المحتوى -->
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.search-button {
  &:hover {
    span {
      display: block;
    }
  }
}
</style>
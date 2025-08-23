<script setup >
import { FunnelIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";
import ButtonTab from "../../ButtonTab.vue";
import { onMounted, ref, watch } from "vue";
import { ListBulletIcon } from "@heroicons/vue/24/solid";

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

onMounted(() => {
  search.value = route.query.for;
});
</script>

<template>
  <div class="flex items-center gap-2 text-[24px] text-gray-700 font-[500]">
    <span>نتائج البحث:</span>
    <span>{{ search }}</span>
  </div>
  <div class="filter">
    <div><FunnelIcon class="w-6 rotate-180" /></div>
  </div>
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
  <main>
    <slot />
  </main>
</template>
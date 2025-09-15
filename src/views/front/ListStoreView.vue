<script setup >
import { FunnelIcon } from "@heroicons/vue/24/outline";
import ButtonTab from "../../components/front/ButtonTab.vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
import MdiIcon from "../../components/front/MdiIcon.vue";
import SingleStoreBox from "../../components/front/SingleStoreBox.vue";
import { useSearchStore } from "../../stores/search";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useFormats from "../../mixins/formats";
import { useRoute } from "vue-router";
// const items = [
//   {
//     storeName: "سوق الشجاعية",
//     price: "55",
//     usdPrice: "14.85",
//     priceType: "سعر عادل",
//     distance: "0.8",
//     rating: "4.5",
//     isCertified: true,
//     lastUpdate: "منذ 30 دقيقة",
//   },
//   {
//     storeName: "محل ابو سامر",
//     price: "52",
//     usdPrice: "14.5",
//     priceType: "سعر جيد",
//     distance: "1.2",
//     isCertified: true,
//     rating: "4.2",
//     lastUpdate: "منذ ساعة",
//   },
//   {
//     storeName: "السوق المركزي",
//     price: "68",
//     usdPrice: "18.83",
//     // priceType: "3.8",
//     distance: "2.1",
//     rating: "سعر مرتفع",
//     isCertified: false,
//     lastUpdate: "منذ 3 ساعات",
//   },
// ];

const { timeAgo } = useFormats();
const searchStore = useSearchStore();
const { stores, current_page, last_page, loading, errors } =
  storeToRefs(searchStore);
const cities = computed(() => {
  const allCities = stores.value.map((store) => {
    return store.city?.name;
  });
  return [...new Set(allCities)];
});
const route = useRoute();

const loadMoreTrigger = ref(null);

const fetchNextPage = async () => {
  if (current_page.value >= last_page.value || loading.value) return;
  await searchStore.fetchAllStoresHasProdcut(
    route.query.id,
    current_page.value + 1,
    {}
  );
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 1.0 }
  );

  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value);
});
</script>

<template>
  <div class="sm:grid gap-2 sm:grid-cols-2 lg:block pb-6">
    <template v-for="store in stores" :key="store.id">
      <template v-for="product in store.products" :key="product.id">
        <SingleStoreBox
          :price="product.price"
          :store-name="store.name"
          :last-update="timeAgo(product.updated_at)"
          :is-certified="true"
          rating="5"
          :city-id="+store.city_id"
          :recent-prices="product.recent_prices"
          :image="store.image"
        />
      </template>
    </template>
    <div ref="loadMoreTrigger" class="w-full h-1"></div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<script setup>
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import ProductSectionTitle from "./ProductSectionTitle.vue";
import ShowMoreButton from "./ShowMoreButton.vue";
import CardProduct from "./global/CardProduct.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { onMounted, reactive, ref, watch } from "vue";
import ShowProductDialog from "./ShowProductDialog.vue";
import ProductsSwaperDispaly from "./global/ProductsSwaperDispaly.vue";
import ShowAllProductButton from "./global/ShowAllProductButton.vue";
import TitleProductsSection from "./global/TitleProductsSection.vue";
import ProductGridDisplay from "./global/ProductGridDisplay.vue";
import axiosClient from "../../axiosClient";

const showProductDialog = reactive({
  dialog: false,
  product_id: 0,
});

const buttonLabel = ref("عرض الكل");

const showProduct = (payload) => {
  const id = typeof payload === 'object' && payload !== null ? payload.id : payload;
  if (!id || Number.isNaN(Number(id))) return;
  showProductDialog.product_id = id;
  Promise.resolve().then(() => {
    showProductDialog.dialog = true;
  });
};
const data = ref({});
const loading = ref(false);

const showAll = ref(false);

watch(
  () => data.value.current_page,
  async (newPage) => {
    if (newPage !== 1) {
      await fetchProducts(newPage);
    }
  }
);

const fetchProducts = async (page = 1) => {
  try {
    const response = await axiosClient.get(
      `/product/last-products?page=${page}`
    );
    data.value = response.data;
  } catch (e) {
  } finally {
  }
};

onMounted(async () => {
  loading.value = true;
  await fetchProducts();
  loading.value = false;
});
</script>

<template>
  <TitleProductsSection :icon="ArrowTrendingUpIcon" title="اخر الاسعار">
    <template #button v-if="data?.data?.length >= 5">
      <ShowAllProductButton @showAll="($event) => (showAll = $event)" />
    </template>
  </TitleProductsSection>
  <div class="" v-if="!loading && data?.data?.length">
    <ProductsSwaperDispaly v-if="!showAll" @showProduct="showProduct($event)" :products="data.data" />
    <ProductGridDisplay :products="data.data" v-model="data.current_page" :last-page="data.last_page"
      @showProduct="showProduct($event)" v-else />
  </div>
  <div class="flex justify-center items-center h-24" v-else>
    <div>
      <span class="text-gray-700 dark:text-gray-300 font-[400] block mb-4">لم يتم حتى الان اضافة اي منتجات</span>
    </div>
  </div>
  <ShowProductDialog v-model="showProductDialog.dialog" :productId="+showProductDialog.product_id" />
</template>

<style scoped>
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}
</style>
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
import { FireIcon, HeartIcon } from "@heroicons/vue/24/outline";
import axiosClient from "../../axiosClient";

const items = [
  {
    image: "../../../public/flour.webp",
    price: "",
    name: "",
    storeName: "",
    description: "",
    time: "",
  },
];

const showProductDialog = reactive({
  dialog: false,
  data: {},
});

const buttonLabel = ref("عرض الكل");

const showProduct = (productId) => {
  showProductDialog.dialog = true;
  showProductDialog.product_id = productId;
};
const products = ref([]);
const paginations = reactive({
  current_page: 1,
  last_page: 1,
});
const loading = ref(false);

const showAll = ref(false);
watch(
  () => paginations.current_page,
  async (newPage) => {
    if (newPage !== 1) {
      await fetchProducts(newPage);
    }
  }
);

const fetchProducts = async (page = 1) => {
  try {
    const response = await axiosClient.get(`/favorites?page=${page}`);
    console.log("offers", response.data);
    products.value = response.data.favorites.data.map((el) => el.product);
    paginations.current_page = response.data.favorites.current_page;
    paginations.last_page = response.data.favorites.last_page;
    // store.value = response.data.store;
  } catch (e) {
    console.error(e);
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
  <TitleProductsSection :icon="HeartIcon" title="المفضلة">
    <template #button v-if="products.length >= 5">
      <ShowAllProductButton @showAll="($event) => (showAll = $event)" />
    </template>
  </TitleProductsSection>
  <div class="" v-if="!loading && products.length">
    <ProductsSwaperDispaly
      v-if="!showAll"
      @showProduct="showProduct($event)"
      :products="products"
    />
    <ProductGridDisplay
      @showProduct="showProduct($event)"
      :products="products"
      v-model="paginations.current_page"
      :last-page="paginations.last_page"
      v-else
    />
  </div>
  <div class="flex justify-center items-center h-24" v-else>
    <div>
      <span class="text-gray-700 dark:text-gray-300 font-[400] block mb-4"
        >لم تقم حتى الان باضافة اي منتج الى قائمتك المفضلة</span
      >
    </div>
  </div>
  <ShowProductDialog
    v-model="showProductDialog.dialog"
    :product-id="+showProductDialog.product_id"
  />
</template>

<style scoped >
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}
</style>
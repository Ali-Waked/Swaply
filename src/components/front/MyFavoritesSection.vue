<script setup>
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import ProductSectionTitle from "./ProductSectionTitle.vue";
import ShowMoreButton from "./ShowMoreButton.vue";
import CardProduct from "./global/CardProduct.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { reactive, ref } from "vue";
import ShowProductDialog from "./ShowProductDialog.vue";
import ProductsSwaperDispaly from "./global/ProductsSwaperDispaly.vue";
import ShowAllProductButton from "./global/ShowAllProductButton.vue";
import TitleProductsSection from "./global/TitleProductsSection.vue";
import ProductGridDisplay from "./global/ProductGridDisplay.vue";
import { FireIcon, HeartIcon } from "@heroicons/vue/24/outline";

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

const showProduct = () => {
  showProductDialog.dialog = true;
  showProductDialog.data = {
    image: "../../../public/flour.webp",
    price: "20",
    usdPrice: "500",
    name: "سكر ابيض",
    description: "1 كيلو نقي و مكرر",
    storeName: "متجر الشجاعية",
    time: "منذ ساعتين",
    rating: 4.5,
    distance: "0.8 كم",
  };
};

const showAll = ref(false);
</script>

<template>
  <TitleProductsSection :icon="HeartIcon" title="المفضلة">
    <template #button>
      <ShowAllProductButton @showAll="($event) => (showAll = $event)" />
    </template>
  </TitleProductsSection>
  <ProductsSwaperDispaly v-if="!showAll" @showProduct="showProduct($event)" />
  <ProductGridDisplay @showProduct="showProduct($event)" v-else />
  <ShowProductDialog
    v-model="showProductDialog.dialog"
    :data="showProductDialog.data"
  />
</template>

<style scoped >
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}
</style>
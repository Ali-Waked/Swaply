<script setup>
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import ProductSectionTitle from "./ProductSectionTitle.vue";
import ShowMoreButton from "./ShowMoreButton.vue";
import CardProduct from "./global/CardProduct.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { reactive, ref } from "vue";
import ShowProductDialog from "./ShowProductDialog.vue";

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
const showAllProduct = () => {
  if (showAll.value) {
    buttonLabel.value = "عرض الكل";
    showAll.value = false;
    return;
  }
  showAll.value = true;
  buttonLabel.value = "عرض اقل";
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center">
      <ProductSectionTitle title="اخر الاسعار" :icon="ArrowTrendingUpIcon" />
      <ShowMoreButton @click="showAllProduct()" :label="buttonLabel" />
    </div>
  </div>
  <div class="mt-4 overflow-x-hidden" v-if="!showAll">
    <Swiper
      :slidesPerView="5"
      class="mt-6 overflow-visible"
      :spaceBetween="20"
      :modules="[Pagination, Autoplay]"
      :pagination="{ el: '.pagination', clickable: true }"
      loop
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 15 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
        1280: { slidesPerView: 5, spaceBetween: 20 },
      }"
    >
      <swiper-slide
        v-for="n in 10"
        :key="n"
        class="swiper-wrapper overflow-visible"
      >
        <CardProduct
          image="../../../public/flour.webp"
          :price="20"
          name="سكر ابيض"
          description="1 كيلو نقي و مكرر"
          store-name="متجر الشجاعية"
          time="منذ ساعتين"
          @click="showProduct()"
        />
      </swiper-slide>
      <!-- <div class="pagination"></div> -->
    </Swiper>
  </div>
  <div v-else>
    <div class="container mx-auto mt-6 grid grid-cols-5 gap-4">
      <div
        v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
        :key="index"
      >
        <CardProduct
          image="../../../public/flour.webp"
          :price="20"
          name="سكر ابيض"
          description="1 كيلو نقي و مكرر"
          store-name="متجر الشجاعية"
          time="منذ ساعتين"
          @click="showProduct()"
        />
      </div>
    </div>
  </div>
  <ShowProductDialog
    v-model="showProductDialog.dialog"
    :data="showProductDialog.data"
  />
  <!-- <img src="../../../public/flour.webp" alt="" /> -->
</template>

<style scoped >
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}
</style>
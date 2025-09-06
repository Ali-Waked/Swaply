<script setup>
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { reactive, ref } from "vue";
import ProductSectionTitle from "../ProductSectionTitle.vue";
import CardProduct from "./CardProduct.vue";
import ShowProductDialog from "../ShowProductDialog.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// const props = defineProps({
//   icon: {
//     type: Object,
//     default: ArrowTrendingUpIcon,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });

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

// const showProductDialog = reactive({
//   dialog: false,
//   data: {},
// });

// const showProduct = () => {
//   showProductDialog.dialog = true;
//   showProductDialog.data = {
//     image: "../../../public/flour.webp",
//     price: "20",
//     usdPrice: "500",
//     name: "سكر ابيض",
//     description: "1 كيلو نقي و مكرر",
//     storeName: "متجر الشجاعية",
//     time: "منذ ساعتين",
//     rating: 4.5,
//     distance: "0.8 كم",
//   };
// };

// const showAll = ref(false);
</script>

<template>
  <div class="mt-2 overflow-x-hidden mx-auto container">
    <Swiper
      :slidesPerView="5"
      class="mt-6 overflow-visible"
      :spaceBetween="20"
      :modules="[Pagination, Autoplay, Navigation]"
      :pagination="{ el: '.pagination', clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      loop
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        320: { slidesPerView: 1.5, spaceBetween: 10 },
        500: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        745: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 3.5, spaceBetween: 20 },
        950: { slidesPerView: 3.5, spaceBetween: 20 },
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
          @click="$emit('showProduct', n)"
        />
      </swiper-slide>
      <!-- <div class="pagination"></div> -->
      <div
        class="swiper-button-prev w-10 h-10 flex items-center justify-center bg-transparent border-2 border-blue-400 dark:border-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      ></div>

      <div
        class="swiper-button-next w-10 h-10 flex items-center justify-center bg-transparent border-2 border-blue-400 dark:border-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      ></div>
    </Swiper>
  </div>
</template>

<style scoped >
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}

.swiper-button-prev,
.swiper-button-next {
  width: 46px !important;
  height: 46px !important;
  top: calc(50% - 24px) !important;
}
.swiper-button-prev::after,
.swiper-button-next::after {
  /* margin-top: -24px !important; */
  font-size: 18px !important;
  font-weight: bold;
  color: currentColor !important;
}
</style>

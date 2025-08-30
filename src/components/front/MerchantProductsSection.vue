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
import { FireIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";
import AddProductDialog from "./AddProductDialog.vue";
import ConfirmDeleteDialog from "./global/ConfirmDeleteDialog.vue";

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
const addProduct = ref(false);

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
const dialogOpen = ref(false);

const deleteProduct = () => {
  console.log("✅ Product deleted");
};

const showConfirmDialog = (data) => {
  showProductDialog.dialog = false;
  dialogOpen.value = true;
};

const showAll = ref(false);
</script>

<template>
  <TitleProductsSection :icon="ShoppingBagIcon" title="منتجاتي">
    <template #button>
      <!-- <div class="flex-1 mr-4 relative">
        <span
          class="flex plus-icon relative transition-all items-center justify-center border-2 border-blue-700 cursor-pointer h-[26px] w-[26px] rounded-full text-blue-700 hover:text-white hover:bg-blue-700 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          <span
            class="absolute -top-9 left-1/2 hidden -translate-x-1/2 bg-black/70 dark:bg-gray-700 text-white dark:text-gray-200 text-[12px] w-[120px] p-1 text-center rounded-md transition-all duration-200 pointer-events-none"
          >
            اضافة منتج جديد
          </span>
        </span>
      </div> -->
      <div class="flex gap-4 items-center justify-between">
        <button
          @click="addProduct = true"
          class="text-[14px] flex gap-1 font-[400] border-2 bg-blue-700 border-blue-700 text-white rounded-lg px-4 py-[6px] transition-colors hover:bg-blue-800 hover:border-blue-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <PlusIcon class="w-5 h-5" />
          <span> اضافة منتج </span>
        </button>
        <ShowAllProductButton @showAll="($event) => (showAll = $event)" />
      </div>
    </template>
  </TitleProductsSection>
  <ProductsSwaperDispaly v-if="!showAll" @showProduct="showProduct($event)" />
  <ProductGridDisplay @showProduct="showProduct($event)" v-else />
  <ShowProductDialog
    v-model="showProductDialog.dialog"
    :data="showProductDialog.data"
    @deleteProduct="showConfirmDialog($event)"
  />
  <AddProductDialog v-model="addProduct" />
  <ConfirmDeleteDialog v-model:open="dialogOpen" @confirm="deleteProduct" />
</template>

<style lang="scss" scoped >
.swiper,
.swiper-wrapper,
.swiper-slide {
  overflow: visible !important;
}
.plus-icon {
  &:hover {
    span {
      display: block;
    }
  }
}
</style>
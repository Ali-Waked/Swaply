<script setup>
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import ProductSectionTitle from "./ProductSectionTitle.vue";
import ShowMoreButton from "./ShowMoreButton.vue";
import CardProduct from "./global/CardProduct.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import ShowProductDialog from "./ShowProductDialog.vue";
import ProductsSwaperDispaly from "./global/ProductsSwaperDispaly.vue";
import ShowAllProductButton from "./global/ShowAllProductButton.vue";
import TitleProductsSection from "./global/TitleProductsSection.vue";
import ProductGridDisplay from "./global/ProductGridDisplay.vue";
import { FireIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";
import AddProductDialog from "./AddProductDialog.vue";
// import ConfirmDeleteDialog from "./global/ConfirmDeleteDialog.vue";
import axiosClient from "../../axiosClient";
import AddProductButton from "../../views/front/AddProductButton.vue";
import AddOrEditOfferDialog from "./AddOrEditOfferDialog.vue";
import ConfirmDeleteDialog from "../dashboard/global/ConfirmDeleteDialog.vue";

const data = ref({});
const loading = ref(false);

const showProductDialog = reactive({
  dialog: false,
  product_id: 0,
});
const confirmDelDialog = reactive({
  dialog: false,
  product: null,
  type: "product",
  title: "حذف المنتج",
  message:
    "هل أنت متأكد أنك تريد حذف هذا المنتج؟ هذا الإجراء لا يمكن التراجع عنه",
});

const buttonLabel = ref("عرض الكل");
const addProduct = ref(false);
const store = ref([]);
const addDiscount = reactive({
  dialog: false,
  product: {},
});

const showProduct = (productId) => {
  showProductDialog.dialog = true;
  showProductDialog.product_id = productId;
};
const addDiscountDialog = (product) => {
  showProductDialog.dialog = false;
  addDiscount.dialog = true;
  addDiscount.product = product;
};
// const dialogOpen = ref(false);
const emitter = inject("emitter");

const confirmDel = async () => {
  try {
    if (confirmDelDialog.type == "product") {
      const response = await axiosClient.delete(
        `merchant/store/products/${confirmDelDialog.product.id}`
      );
      if (response.status == 200) {
        emitter.emit("showNotificationAlert", [
          "success",
          `تم حذف المنتج بنجاح من متجرك!`,
        ]);
        fetchProducts();
      }
    } else if (confirmDelDialog.type == "offer") {
      const response = await axiosClient.delete(
        `/merchant/offers/${confirmDelDialog.product.offer.id}`
      );
      if (response.status == 200) {
        emitter.emit("showNotificationAlert", [
          "success",
          `تم حذف المنتج بنجاح من متجرك!`,
        ]);
        fetchProducts();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
const productEdit = ref({
  product_id: null,
});

const showConfirmDialog = (product) => {
  showProductDialog.dialog = false;
  confirmDelDialog.product = product;
  confirmDelDialog.title = "حذف المنتج";
  confirmDelDialog.message =
    "هل أنت متأكد أنك تريد حذف هذا المنتج؟ هذا الإجراء لا يمكن التراجع عنه";
  confirmDelDialog.type = "product";
  confirmDelDialog.dialog = true;
};
const editProduct = (product) => {
  productEdit.value = product;
  showProductDialog.dialog = false;
  addProduct.value = true;
};

// const deleteDiscount = reactive({
//   dialog: false,
//   product: {},
// });
const deleteDiscountDialog = (product) => {
  console.log(product);
  showProductDialog.dialog = false;
  confirmDelDialog.product = product;
  confirmDelDialog.title = "هل أنت متأكد من حذف العرض؟";
  confirmDelDialog.message = `سيتم حذف العرض المرتبط بالمنتج "${product.name}" بشكل نهائي. لا يمكن التراجع عن هذه العملية.`;
  confirmDelDialog.type = "offer";
  confirmDelDialog.dialog = true;
};
const showAll = ref(false);
const storeProductIds = computed(() =>
  data.value?.data
    ?.map((p) => p.product_id)
    .filter((id) => id !== productEdit.value?.product_id)
);

watch(
  () => data.value.current_page,
  async (newPage) => {
    if (newPage) {
      await fetchProducts(newPage);
    }
  }
);

const fetchProducts = async (page = 1) => {
  try {
    const response = await axiosClient.get(
      `merchant/store/products?page=${page}`
    );
    data.value = response.data.products;
    store.value = response.data.store;
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
        <AddProductButton
          @add-product="
            productEdit.product_id = 0;
            addProduct = true;
          "
        />
        <ShowAllProductButton
          v-if="data?.data?.length >= 5"
          @showAll="($event) => (showAll = $event)"
        />
      </div>
    </template>
  </TitleProductsSection>
  <div class="" v-if="!loading && Object.keys(data).length">
    <ProductsSwaperDispaly
      v-if="!showAll"
      @showProduct="showProduct($event)"
      :products="data.data"
    />
    <ProductGridDisplay
      @showProduct="showProduct($event)"
      :products="data.data"
      v-model="data.current_page"
      :last-page="data.last_page"
      v-else
    />
  </div>
  <div class="flex justify-center items-center h-24" v-else>
    <div>
      <span class="text-gray-700 dark:text-gray-300 font-[400] block mb-4"
        >لا يوجد لديك منتجات</span
      >
      <AddProductButton @add-product="addProduct = true" />
    </div>
  </div>
  <ShowProductDialog
    v-model="showProductDialog.dialog"
    :product-id="showProductDialog.product_id"
    :is-for-me="true"
    @deleteProduct="showConfirmDialog($event)"
    @editProduct="editProduct($event)"
    @addDiscount="addDiscountDialog($event)"
    @deleteDiscount="deleteDiscountDialog($event)"
  />
  <AddProductDialog
    v-model="addProduct"
    @fetch-products="fetchProducts"
    :productsIds="storeProductIds"
    v-model:productEdit="productEdit"
  />
  <AddOrEditOfferDialog
    v-model="addDiscount.dialog"
    @fetch-products="fetchProducts"
    :product="addDiscount.product"
  />
  <ConfirmDeleteDialog
    v-model="confirmDelDialog.dialog"
    :title="confirmDelDialog.title"
    :message="confirmDelDialog.message"
    @confirm="confirmDel"
  />
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
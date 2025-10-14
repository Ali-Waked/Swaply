<template>
  <TransitionRoot :show="modelValue" as="template">
    <Dialog
      @close="closeDialog"
      class="relative overflow-visible z-[100000000]"
    >
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/30 dark:bg-black/60"
        aria-hidden="true"
      />

      <div
        class="fixed inset-0 flex items-center justify-center p-4 overflow-auto"
      >
        <DialogPanel
          :key="productId"
          class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg relative max-h-[95vh] scrollbar-hide overflow-auto shadow-lg"
        >
          <DialogTitle class="mb-3 px-6 pt-12 pb-1" v-if="product">
            <h3
              class="title font-[500] text-[24px] text-gray-800 dark:text-white"
            >
              تفاصيل المنتج
            </h3>
          </DialogTitle>

          <!-- صورة -->
          <div v-if="product"
            class="imag flex justify-center items-center bg-gray-100 dark:bg-gray-700 p-2 h-64"
          >
            <img
              :src="product.image"
              class="w-full h-full object-contain"
              :alt="product.name"
            />
          </div>

          <div class="p-6 pt-5" v-if="product">
            <!-- الاسم والسعر -->
            <div
              class="flex items-center justify-between font-[400] text-[24px] text-gray-800 dark:text-gray-100 mb-1"
            >
              <span class="name">{{ product.name }}</span>
              <div>
                <span
                  class="old_price line-through text-sm inline-block ml-1"
                  v-if="priceAfterOffer && priceAfterOffer != product.price"
                  >{{
                    currencyFormat(product.price, undefined, "ar", "ILS")
                  }}</span
                >
                <span class="price">{{
                  currencyFormat(priceAfterOffer, undefined, "ar", "ILS")
                }}</span>
              </div>
            </div>

            <!-- الوصف -->
            <div
              class="flex items-center justify-between text-gray-400 dark:text-gray-300"
            >
              <span class="name">{{ product.description }}</span>
              <div>
                <span
                  class="old_price line-through text-sm inline-block ml-1"
                  v-if="priceAfterOffer && priceAfterOffer != product.price"
                >
                  {{ usdPrice.old_price }}
                </span>
                <span class="price">{{ usdPrice.current_price }}</span>
              </div>
            </div>

            <!-- اسم المحل -->
            <div class="flex justify-between mt-2 items-center">
              <span class="owner text-gray-700 dark:text-white">{{ product.store?.name }} - {{ product.store?.address }}</span>
               
            </div>
            <!-- التقييم -->
            <div class="flex justify-end mt-1 items-center">
              <span class="flex items-center gap-2">
                <span
                  class="font-[400] text-gray-800 dark:text-gray-100 text-[28px]"
                >
                  {{ product.rating }}
                </span>
                <StarIcon class="text-amber-400 w-8 h-8" />
              </span>
              <span
                class="text-[12px] rounded-lg px-4 py-[6px] cursor-default"
                :class="priceType.style"
              >
                {{ priceType.rating }}
              </span>
            </div>

            <!-- المسافة -->
            <div>
              <span
                class="text-gray-800 dark:text-gray-100 font-[400] block text-[20px] mt-2"
              >
                المسافة
              </span>
              <span
                class="text-gray-600 dark:text-gray-300 font-[400] flex items-center gap-1"
              >
                <MdiIcon
                  :icon="mdiNavigationOutline"
                  class="text-gray-600 dark:text-gray-300"
                />
                <span>
                  {{ distance }}
                  <span v-if="typeof distance == 'number'">كم</span></span
                >
              </span>
            </div>

            <!-- اخر تحديث -->
            <div>
              <span
                class="text-gray-800 dark:text-gray-100 font-[400] block text-[20px] mt-2"
              >
                اخر تحديث
              </span>
              <div
                class="flex items-center text-[14px] mt-1 text-gray-600 dark:text-gray-300 gap-1"
              >
                <ClockIcon class="w-4 h-4" />
                <span>{{ getRelativeTime(product.updated_at) }}</span>
              </div>
            </div>

            <!-- فاصل -->
            <span
              class="block w-full h-[2px] bg-gray-100 dark:bg-gray-700 my-4"
            />

            <!-- زر الابلاغ -->
            <div v-if="!isForMe">
              <button
                v-if="!product.is_reported"
                @click="sendReport"
                class="flex items-center justify-center w-full py-2 border-2 rounded-lg border-red-600 text-red-600 gap-2 bg-white dark:bg-red-900/20 dark:text-red-400 dark:border-red-400"
              >
                <MdiIcon
                  class="text-red-600 dark:text-red-400"
                  :icon="mdiFlagOutline"
                />
                <span>ابلاغ عن غلاء الاسعار</span>
              </button>

              <!-- زر تم الابلاغ -->
              <button
                v-else
                class="flex items-center justify-center cursor-default select-none w-full py-2 border-2 rounded-lg border-red-600 text-white gap-2 bg-red-600 mt-2 dark:border-red-500 dark:bg-red-500"
              >
                <MdiIcon class="text-white" :icon="mdiFlagOutline" />
                <span>تم الابلاغ</span>
              </button>
            </div>
            <div
              v-if="isForMe"
              :class="[
                'gap-2',
                productButtons.length >= 4
                  ? 'grid grid-cols-1  sm:grid-cols-2 gap-1'
                  : 'flex items-center justify-center flex-wrap sm:flex-nowrap',
              ]"
            >
              <MainButtonForMyProduct
                v-for="btn in productButtons"
                :key="btn.label"
                :icon="btn.icon"
                :label="btn.label"
                @click="btn.onClick"
                :class="btn.class"
              />
            </div>
          </div>
          <!-- زر الإغلاق -->
          <div class="absolute top-[20px] right-[20px]">
            <span
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-all cursor-pointer"
            >
              <XMarkIcon class="h-5 w-5 stroke-[4px]" @click="closeDialog()" />
            </span>
            <button class="sr-only" @click="closeDialog()">close</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  inject,
  ref,
  onMounted,
  watch,
  computed,
  watchEffect,
  reactive,
} from "vue";
import { ClockIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { CameraIcon } from "@heroicons/vue/24/outline";
import {
  TransitionRoot,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import HeaderTitle from "./global/HeaderTitle.vue";
import FormControl from "./global/FormControl.vue";
import MainButton from "./global/MainButton.vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import {
  mdiFlagOutline,
  mdiNavigationOutline,
  mdiPencilOutline,
  mdiTagOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";

import format from "../../mixins/formats";
import axiosClient from "../../axiosClient";
import { useCurrencyStore } from "../../stores/currencyStore";
import MainButtonForMyProduct from "./MainButtonForMyProduct.vue";
import { useCityStore } from "../../stores/city";
import usePrice from "../../mixins/price";
const { calculatePriceRating } = usePrice();
const isReported = ref(false);
const product = ref(null);
const emitter = inject("emitter");
const data = ref({});
const usdPrice = reactive({
  current_price: 0,
  old_price: 0,
});
const emit = defineEmits([
  "update:modelValue",
  "addDiscount",
  "deleteDiscount",
  "deleteProduct",
  "editProduct",
]);
const productButtons = computed(() => {
  const buttons = [
    {
      icon: mdiPencilOutline,
      label: "تعديل المنتج",
      onClick: () => emit("editProduct", product.value),
      class:
        "hover:bg-blue-600/95 border-blue-600 text-white gap-2 bg-blue-600 mt-2 dark:border-blue-500 dark:bg-blue-500",
    },
  ];

  if (!product.value.active_offer) {
    buttons.push({
      icon: mdiTagOutline,
      label: "اضافة عرض",
      onClick: () => emit("addDiscount", product.value),
      class:
        "hover:bg-green-600/95 border-green-600 text-white gap-2 bg-green-600 mt-2 dark:border-green-500 dark:bg-green-500",
    });
  } else {
    buttons.push(
      {
        icon: mdiTagOutline,
        label: "تعديل عرض",
        onClick: () => emit("addDiscount", product.value),
        class:
          "hover:bg-green-600/95 border-green-600 text-white gap-2 bg-green-600 mt-2 dark:border-green-500 dark:bg-green-500",
      },
      {
        icon: mdiTagOutline,
        label: "حذف عرض",
        onClick: () => emit("deleteDiscount", product.value),
        class:
          "hover:bg-red-600/95 border-red-600 text-white gap-2 bg-red-600 mt-2 dark:border-red-500 dark:bg-red-500",
      }
    );
  }

  buttons.push({
    icon: mdiTrashCanOutline,
    label: "حذف المنتج",
    onClick: () => emit("deleteProduct", product.value),
    class:
      "hover:bg-red-600/95 border-red-600 text-white gap-2 bg-red-600 mt-2 dark:border-red-500 dark:bg-red-500",
  });

  return buttons;
});

const { currencyFormat, getRelativeTime, calculatePriceAfterOffer } = format();
const currencyStore = useCurrencyStore();
const cityStore = useCityStore();
const distance = computed(() => {
  return cityStore.distanceToSpecificCity(product.value?.store?.city_id);
});

const priceType = computed(() => {
  return calculatePriceRating(props.price, props.recentPrices);
});

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  productId: { type: Number },
  isForMe: { type: Boolean, default: false },
});

const priceAfterOffer = computed(() => {
  return calculatePriceAfterOffer({
    price: product.value.price,
    offer: product.value.active_offer,
  });
});

watchEffect(async () => {
  if (product.value) {
    usdPrice.old_price = await currencyStore.convertToUSD(product.value.price);
    usdPrice.current_price = await currencyStore.convertToUSD(
      priceAfterOffer.value
    );
  }
});

// const emitter = inject("emitter");

function closeDialog() {
  emit("update:modelValue", false);
}

watch(
  () => props.productId,
  async () => {
    // Optimistic seed: if we can find the product in the list via injected cache later
    product.value = null;
    usdPrice.current_price = 0;
    usdPrice.old_price = 0;
    if (props.isForMe) {
      const response = await axiosClient.get(
        `merchant/store/products/${props.productId}`
      );
      if (response.status == 200) {
        product.value = response.data.product;
      }
    } else {
      const response = await axiosClient.get(`product/view/${props.productId}`, { cache: { ttl: 5 * 60 * 1000 } });
      if (response.status == 200) {
        product.value = response.data.product;
      }
    }
  }
);

const sendReport = async () => {
  try {
    const response = await axiosClient.post(
      `/products/${product.value.id}/report`
    );
    if (response.status == 200) {
      product.value.is_reported = true;
      emitter.emit("showNotificationAlert", [
        "success",
        "تم الابلاغ عن هذا المنتج!",
      ]);
    }
  } catch (e) {}
};
</script>


<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
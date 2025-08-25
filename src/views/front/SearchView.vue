<script setup >
import { FunnelIcon } from "@heroicons/vue/24/outline";
import ButtonTab from "../../components/front/ButtonTab.vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
import MdiIcon from "../../components/front/MdiIcon.vue";
import StoreBox from "../../components/front/StoreBox.vue";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";
const items = [
  {
    storeName: "سوق الشجاعية",
    price: "55",
    usdPrice: "14.85",
    priceType: "سعر عادل",
    distance: "0.8",
    rating: "4.5",
    isCertified: true,
    lastUpdate: "منذ 30 دقيقة",
  },
  {
    storeName: "محل ابو سامر",
    price: "52",
    usdPrice: "14.5",
    priceType: "سعر جيد",
    distance: "1.2",
    isCertified: true,
    rating: "4.2",
    lastUpdate: "منذ ساعة",
  },
  {
    storeName: "السوق المركزي",
    price: "68",
    usdPrice: "18.83",
    // priceType: "3.8",
    distance: "2.1",
    rating: "سعر مرتفع",
    isCertified: false,
    lastUpdate: "منذ 3 ساعات",
  },
];
</script>

<template>
  <div
    class="flex flex-col-reverse lg:grid lg:gap-5 lg:grid-cols-3 lg:max-h-screen lg:overflow-scroll scrollbar-hide"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 lg:block lg:mt-0">
      <template v-for="item in items" :key="item.storeName">
        <StoreBox
          :price="item.price"
          :usd-price="item.usdPrice"
          :store-name="item.storeName"
          :last-update="item.lastUpdate"
          :is-certified="item.isCertified"
          :rating="item.rating"
          :distance="item.distance"
          :priceType="item.priceType"
        />
      </template>
    </div>
    <div
      class="col-span-2 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-screen"
    ></div>
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
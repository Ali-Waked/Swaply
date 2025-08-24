<script setup >
import { FunnelIcon } from "@heroicons/vue/24/outline";
import ButtonTab from "../../components/front/ButtonTab.vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
import MdiIcon from "../../components/front/MdiIcon.vue";
import SingleStoreBox from "../../components/front/SingleStoreBox.vue";
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
  <div class="sm:grid gap-2 sm:grid-cols-2 lg:block">
    <template v-for="item in items" :key="item.storeName">
      <SingleStoreBox
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
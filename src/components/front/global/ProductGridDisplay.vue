<script setup >
import CardProduct from "./CardProduct.vue";
</script>

<template>
  <div class="mt-8">
    <div
      class="container mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
    >
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
          @click="$emit('showProduct', item)"
        />
      </div>
    </div>
  </div>
</template>
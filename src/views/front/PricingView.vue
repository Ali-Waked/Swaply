<script setup>
import { storeToRefs } from "pinia";
import AuthFeaturesSection from "../../components/front/AuthFeaturesSection.vue";
import AppFooter from "../../components/front/global/AppFooter.vue";
import BackButton from "../../components/front/global/BackButton.vue";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";
import HomeNav from "../../components/front/HomeNav.vue";
import LastPricing from "../../components/front/LastPricing.vue";
import MerchantProductsSection from "../../components/front/MerchantProductsSection.vue";
import MyFavoritesSection from "../../components/front/MyFavoritesSection.vue";
import OfferSection from "../../components/front/OfferSection.vue";
import ReportButton from "../../components/front/ReportButton.vue";
import SearchSection from "../../components/front/SearchSection.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <HeaderPage>
    <div class="container mx-auto">
      <LogoSection />
    </div>
  </HeaderPage>
  <div class="dark:bg-gray-800">
    <!-- <HomeNav /> -->
    <div class="container mx-auto mt-20">
      <SearchSection />
    </div>
  </div>

  <div class="py-14 dark:bg-gray-800">
    <LastPricing />
  </div>

  <div class="dark:bg-gray-800">
    <OfferSection />
  </div>

  <div class="dark:bg-gray-800 pt-14" v-if="user.role == 'merchant'">
    <MerchantProductsSection />
  </div>
  <div class="dark:bg-gray-800 pt-14 pb-4">
    <MyFavoritesSection />
  </div>
  <div class="bg-gray-200 dark:bg-gray-700 mt-12 rounded-t-xl">
    <AppFooter />
  </div>

  <!-- <div class="bg-white py-14 dark:bg-gray-800">
    <AuthFeaturesSection />
  </div> -->
  <!-- <div class="bg-gray-100 dark:bg-gray-700">
    <AppFooter />
  </div> -->
</template>

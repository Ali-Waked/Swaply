<script setup>
import AuthFeaturesSection from "../../components/front/AuthFeaturesSection.vue";
import AppFooter from "../../components/front/global/AppFooter.vue";
import BackButton from "../../components/front/global/BackButton.vue";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";
import HomeNav from "../../components/front/HomeNav.vue";
import LastPricing from "../../components/front/LastPricing.vue";
import OfferSection from "../../components/front/OfferSection.vue";
import ReportButton from "../../components/front/ReportButton.vue";
import SearchSection from "../../components/front/SearchSection.vue";
</script>

<template>
  <HeaderPage>
    <LogoSection />
  </HeaderPage>
  <div class="bg-white dark:bg-gray-800">
    <!-- <HomeNav /> -->
    <div class="container mx-auto mt-16">
      <SearchSection />
    </div>
  </div>

  <div class="bg-white py-14 dark:bg-gray-800">
    <LastPricing />
  </div>

  <div class="bg-white dark:bg-gray-800 mb-12">
    <OfferSection />
  </div>

  <!-- <div class="bg-white py-14 dark:bg-gray-800">
    <AuthFeaturesSection />
  </div> -->
  <!-- <div class="bg-gray-100 dark:bg-gray-700">
    <AppFooter />
  </div> -->
</template>
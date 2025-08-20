<script setup>
import ButtonGroup from "../../components/front/global/ButtonGroup.vue";
import HeaderTitle from "../../components/front/global/HeaderTitle.vue";
import MainButton from "../../components/front/global/MainButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import WoringAlert from "../../components/front/global/WoringAlert.vue";
import { inject, ref, watch } from "vue";
import TradeDialog from "../../components/front/TradeDialog.vue";
import SingleOffer from "../../components/front/SingleOffer.vue";
import ChatApp from "../../components/front/ChatApp.vue";

const isDialogOpen = ref(false);
const isOpenChat = ref(false);
const emitter = inject("emitter");
const startChat = () => {
  isOpenChat.value = true;
  console.log("hi");
};
watch(
  () => isDialogOpen.value,
  (newVal) => {
    if (newVal) {
      emitter.emit("hiddenButton", true);
      return;
    }
    emitter.emit("hiddenButton", false);
  }
);
</script>

<template>
  <HeaderTitle
    title="لوحة المقايضة"
    subtitle="تبادل السلع و الخدمات مع المجتمع"
  />
  <MainButton
    class="mt-4"
    label="اعراض مقايضة جديدة"
    @click="isDialogOpen = true"
  >
    <template #icon>
      <PlusIcon class="h-5 w-5" />
    </template>
  </MainButton>
  <WoringAlert
    class="my-4"
    title="تنبيه امني"
    text="تاكد من لقاء الاشخاص في اماكن امنة. وتحقق من هوية الشخص و درجة الثقة قبل التبادل"
  />
  <TradeDialog
    :model-value="isDialogOpen"
    @update:modelValue="(val) => (isDialogOpen = val)"
  />
  <div class="offers">
    <h5 class="title font-[500] text-[18px] text-black dark:text-white">
      العروض المتاحة
    </h5>

    <div class="offers-list pb-8">
      <template v-for="n in 4" :key="n">
        <SingleOffer class="my-4 last-of-type:mb-0" @startChat="startChat" />
      </template>
    </div>
  </div>
  <ChatApp class="mt-8" v-model:is-open="isOpenChat" />
</template>
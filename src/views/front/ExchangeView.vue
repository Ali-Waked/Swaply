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
import ChatSidebar from "../../components/front/ChatSidebar.vue";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/vue/24/outline";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";

const isDialogOpen = ref(false);
const isOpenChat = ref(false);
const emitter = inject("emitter");
const startChat = () => {
  isOpenChat.value = true;
  console.log("hi");
};
const dialog = ref(false);
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
const chatWith = (data) => {
  dialog.value = false;
  isOpenChat.value = true;
};
</script>

<template>
  <HeaderPage>
    <LogoSection />
  </HeaderPage>
  <HeaderTitle
    title="لوحة المقايضة"
    subtitle="تبادل السلع و الخدمات مع المجتمع"
  />
  <MainButton
    class="mt-4"
    label="اعرض مقايضة جديدة"
    @click="isDialogOpen = true"
  >
    <template #icon>
      <PlusIcon class="h-5 w-5" />
    </template>
  </MainButton>
  <WoringAlert
    class="my-4"
    title="تنبيه أمني"
    text="تاكد من لقاء الاشخاص في اماكن امنة. وتحقق من هوية الشخص و درجة الثقة قبل التبادل"
  />
  <TradeDialog
    :model-value="isDialogOpen"
    @update:modelValue="(val) => (isDialogOpen = val)"
  />
  <div class="offers">
    <div class="flex justify-between items-center">
      <h5 class="title font-[500] text-[20px] text-black dark:text-white">
        العروض المتاحة
      </h5>
      <div
        class="message-icon relative left-4 cursor-pointer text-white bg-gray-600 flex items-center justify-center w-10 h-10 rounded-full font-bold"
        @click="dialog = true"
      >
        <button>
          <ChatBubbleLeftEllipsisIcon class="w-6" />
        </button>
        <span
          class="text-white bg-red-600 text-[9px] w-5 h-5 rounded-full absolute -top-[7px] -right-2 flex justify-center items-center text-center p-1 text-wrap"
          >1</span
        >
      </div>
    </div>

    <div class="offers-list pb-8">
      <template v-for="n in 4" :key="n">
        <SingleOffer class="my-4 last-of-type:mb-0" @startChat="startChat" />
      </template>
    </div>
  </div>
  <ChatApp class="mt-8" v-model:is-open="isOpenChat" />
  <ChatSidebar v-model="dialog" @chatWith="chatWith($event)" />
</template>

<style lang="scss" scoped>
// .message-icon {
//   &:hover {
//     span {
//       display: block;
//     }
//   }
// }
</style>

<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";
import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftIcon,
  MinusIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:isOpen"]);
const chatApp = ref(null);
const isOpenFull = ref(true);
const message = ref("");
const colse = () => {
  emit("update:isOpen", false);
  chatApp.value.style.top = "196px";
  isOpenFull.value = true;
};
const reizeChat = () => {
  if (isOpenFull.value) {
    chatApp.value.style.top = "520px";
    isOpenFull.value = false;
    return;
  }
  chatApp.value.style.top = "196px";
  isOpenFull.value = true;
};
</script>

<template>
  <div
    class="fixed top-[196px] right-9 bg-white dark:bg-gray-800 shadow-xl z-50 rounded-lg w-80 transition-all"
    ref="chatApp"
    v-if="isOpen"
  >
    <!-- Header -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
      <div class="p-5 flex items-center justify-between">
        <div class="info flex items-center gap-2">
          <div
            class="icon text-black dark:text-white text-[12px] font-[500] bg-gray-100 dark:bg-gray-700 h-9 w-9 flex items-center justify-center rounded-full"
          >
            <span>ام</span>
          </div>
          <div>
            <span class="font-[500] flex">
              <span class="text-black dark:text-white text-[14px]"
                >أحمد م.</span
              >
              <span
                class="text-[11px] border border-gray-200 dark:border-gray-600 w-[18px] h-[18px] rounded-full flex items-center gap-1 ml-2 justify-center mr-2"
              >
                <CheckIcon class="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </span>
            </span>
            <div
              class="degree text-gray-600 dark:text-gray-400 text-[12px] font-[500] mt-1"
            >
              درجة الثقة 80%
            </div>
          </div>
        </div>
        <div class="icon flex items-center gap-2">
          <MinusIcon
            class="h-[18px] w-[18px] cursor-pointer text-black dark:text-white hover:opacity-70"
            @click="reizeChat()"
            v-if="isOpenFull"
          />
          <ChatBubbleOvalLeftIcon
            v-else
            class="h-[18px] w-[18px] cursor-pointer text-black dark:text-white hover:opacity-70"
            @click="reizeChat()"
          />
          <XMarkIcon
            class="h-[18px] w-[18px] cursor-pointer text-black dark:text-white hover:opacity-70"
            @click="colse()"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content has-scroll p-5 h-56 overflow-y-auto scrollbar-hide">
      <!-- Sent -->
      <div
        class="send-message bg-black dark:bg-blue-600 rounded-xl p-3 w-fit mb-4 max-w-56 pb-2"
      >
        <p class="text-white text-[13px]">مرحبا! هل ما زال العرض متاح</p>
        <span class="time text-gray-400 text-[11px]">14:30</span>
      </div>
      <!-- Received -->
      <div
        class="recived-message bg-gray-200 dark:bg-gray-700 rounded-xl p-3 pb-2 w-fit mb-4 max-w-56 mr-auto"
      >
        <p class="text-black dark:text-white text-[13px]">
          نعم ما زال العرض متاح، متى يمكننا اللقاء؟
        </p>
        <span class="time text-gray-400 text-[11px]">14:30</span>
      </div>
      <!-- Sent -->
      <div
        class="send-message bg-black dark:bg-blue-600 rounded-xl p-3 w-fit mb-4 max-w-56 pb-2"
      >
        <p class="text-white text-[13px]">مرحبا! هل ما زال العرض متاح</p>
        <span class="time text-gray-400 text-[11px]">14:30</span>
      </div>
      <!-- Received -->
      <div
        class="recived-message bg-gray-200 dark:bg-gray-700 rounded-xl p-3 pb-2 w-fit mb-4 max-w-56 mr-auto"
      >
        <p class="text-black dark:text-white text-[13px]">
          نعم ما زال العرض متاح، متى يمكننا اللقاء؟
        </p>
        <span class="time text-gray-400 text-[11px]">14:30</span>
      </div>
    </div>

    <!-- Input -->
    <div
      class="send p-4 flex items-center gap-2 border-t border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        v-model="message"
        placeholder="اكتب رسالتك..."
        class="focus:border-gray-500 focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <button
        class="text-white rounded-lg w-14 h-10 inline-flex items-center justify-center transition"
        :class="{
          'bg-black dark:bg-blue-600': message.length,
          'bg-gray-500 cursor-not-allowed': !message.length,
        }"
      >
        <PaperAirplaneIcon class="w-[22px] h-[22px] -rotate-[45deg]" />
      </button>
    </div>
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
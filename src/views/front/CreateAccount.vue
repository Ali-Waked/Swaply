<script setup>
import { onMounted, ref, watch } from "vue";
import MainButton from "../../components/front/global/MainButton.vue";
import { mdiGoogle } from "@mdi/js";
import MdiIcon from "../../components/front/MdiIcon.vue";
import ButtonTab from "../../components/front/ButtonTab.vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import IMask from "imask";
import { VueSpinnerIos, VueSpinnerPuff } from "vue3-spinners";
import BackButton from "../../components/front/global/BackButton.vue";

const showPassword = ref(false);
const password = ref("");

const props = defineProps({});
const type = ref("number");
const placeholderInput = ref("0 59 123 4567");
const buttonTitle = ref("مرحبا بعودتك");
const emailOrPhone = ref("");
const router = useRouter();
const isLoginPage = ref(false);
const isPhoneNumber = ref(true);
const using = ref("phone_number");
const loading = ref(false);

watch(
  isPhoneNumber,
  (newVal) => {
    if (newVal) {
      placeholderInput.value = "0 59 123 4567";
      using.value = "phone_number";
      type.value = "number";
      emailOrPhone.value = "";
    } else {
      placeholderInput.value = "example@gamil.com";
      using.value = "email";
      type.value = "email";
      emailOrPhone.value = "";
    }
    router.replace({
      name: router.currentRoute.value.name,
      query: { using: using.value },
    });
  },
  {
    immediate: true,
  }
);
watch(
  () => router.currentRoute.value.name,
  (newVal) => {
    if (newVal == "login") {
      isLoginPage.value = true;
      buttonTitle.value = "مرحبا بعودتك";
      return;
    }
    isLoginPage.value = false;
    buttonTitle.value = "انضمام";
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="bg-gray-100 dark:bg-gray-800 min-h-screen">
    <div class="logo flex items-center justify-center pt-6">
      <img src="../../../public/Logo.png" class="w-32" />
    </div>
    <div
      class="container mx-auto p-2 sm:p-0 -mt-3 h-screen flex items-center justify-center"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-[22px] border border-gray-300 dark:border-gray-700 p-6 w-full sm:w-[420px]"
      >
        <!-- التبديل بين تسجيل الدخول والتسجيل -->
        <div
          class="buttons bg-gray-200 dark:bg-gray-700 p-[2px] rounded-[12px] text-[16px] flex items-center gap-2 mb-4"
        >
          <ButtonTab
            label="تسجيل الدخول"
            :is-active="isLoginPage"
            @click="router.push({ name: 'login', query: { using } })"
            class="py-2 rounded-[11px]"
          />
          <ButtonTab
            label="انضم مجانا"
            :is-active="!isLoginPage"
            @click="router.push({ name: 'register', query: { using } })"
            class="py-2 rounded-[11px]"
          />
        </div>

        <!-- الاسم الأول والاخير -->
        <div
          class="flex items-center justify-between gap-4 mb-4"
          v-if="!isLoginPage"
        >
          <input
            type="text"
            placeholder="الاسم الاول"
            required
            class="focus:border-gray-500 py-[10px] border-none focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="الاسم الاخير"
            required
            class="focus:border-gray-500 py-[10px] border-none focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
          />
        </div>

        <!-- التبديل بين الايميل والهاتف -->
        <div
          class="buttons bg-gray-200 dark:bg-gray-700 p-[2px] rounded-[9px] text-[13px] flex items-center gap-2 mb-4"
        >
          <ButtonTab
            label="البريد الالكتروني"
            :is-active="!isPhoneNumber"
            @click="isPhoneNumber = false"
            class="py-1 rounded-[8px]"
          />
          <ButtonTab
            label="الهاتف"
            :is-active="isPhoneNumber"
            @click="isPhoneNumber = true"
            class="py-1 rounded-[8px]"
          />
        </div>

        <!-- الايميل أو الهاتف -->
        <div class="relative" dir="ltr">
          <input
            :type="type"
            :placeholder="placeholderInput"
            v-model="emailOrPhone"
            required
            class="no-spinner focus:border-gray-500 border-none focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400"
            :class="{
              'pl-[34px]': type == 'number',
              'pl-[37px]': emailOrPhone !== '' && type == 'number',
            }"
          />
          <span
            v-if="type == 'number'"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
            :class="{
              'mt-[1px] text-[14px] dark:text-gray-400 font-[400] text-gray-500':
                emailOrPhone === '',
            }"
            >+97</span
          >
        </div>

        <!-- كلمة المرور -->
        <div class="relative w-full mt-3">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="كلمة المرور"
            required
            class="focus:border-gray-500 border-none focus:ring-gray-500 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white block w-full placeholder:text-[14px] placeholder:font-[400] dark:placeholder-gray-400 pl-10"
          />

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 left-2 flex items-center px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <component
              :is="showPassword ? EyeIcon : EyeSlashIcon"
              class="w-5 h-5"
            />
          </button>
        </div>

        <!-- نسيت كلمة السر -->
        <span
          v-if="isLoginPage"
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors cursor-pointer text-[12px] mt-[6px] block"
          >هل نسيت كلمة السر؟</span
        >

        <!-- زر تسجيل الدخول -->
        <MainButton
          :label="buttonTitle"
          class="mt-6 select-none"
          :style="{ opacity: loading ? 0.8 : 1 }"
          :class="{ 'pointer-events-none': loading }"
          @click="loading = true"
        >
          <template #icon>
            <VueSpinnerIos v-if="loading" size="20" class="text-gray-50 ml-2" />
          </template>
        </MainButton>

        <!-- أو -->
        <div class="relative mt-4">
          <span
            class="font-[400] text-[16px] text-gray-600 dark:text-gray-300 relative z-40 -top-[4px] w-full flex items-center justify-center"
            >أو</span
          >
          <span
            class="absolute w-[30px] h-[4px] bg-white dark:bg-gray-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          ></span>
          <span
            class="line-through absolute w-full h-[2px] bg-gray-100 dark:bg-gray-700 top-1/2 left-0 -translate-y-1/2 z-10"
          ></span>
        </div>

        <!-- متابعة مع Google -->
        <button
          class="continue-with-google border mt-3 border-gray-200 dark:border-gray-700 flex items-center justify-center w-full py-3 gap-2 rounded-md font-[400] text-gray-800 dark:text-gray-200 transition-all hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-500"
        >
          <MdiIcon
            :icon="mdiGoogle"
            class="w-6 h-6 font-[500]"
            stroke-width="100"
          />
          <span class="text-[17px] font-[500]">المتابعة مع Google</span>
        </button>

        <!-- شروط الخدمة -->
        <span
          class="text-[12px] text-gray-400 dark:text-gray-500 block w-full text-center mt-6"
          >بالمتابعة, انت توافق على شروط الخدمة وسياسة الخصوصية</span
        >
        <div class="flex items-center justify-center gap-2 mt-10">
          <span
            class="border-b-2 cursor-pointer transition-all hover:border-cyan-600 hover:text-cyan-600 text-[12px] border-cyan-500 pb-[2px] text-gray-800 dark:text-gray-200"
            >شروط الخدمة</span
          >

          <span class="w-1 h-1 rounded-full bg-gray-800"></span>
          <span
            class="border-b-2 cursor-pointer transition-all hover:border-cyan-600 hover:text-cyan-600 text-[12px] border-cyan-500 pb-[2px] text-gray-800 dark:text-gray-200"
            >سياسة الخصوصية</span
          >
        </div>
      </div>
      <div class="absolute right-8 top-6">
        <BackButton />
      </div>
    </div>
  </div>
</template>


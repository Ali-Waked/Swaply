<script setup >
import { ref } from "vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SelectListBox from "./global/SelectListBox.vue";
import SingleSettingAccountBox from "./SingleSettingAccountBox.vue";
import { ShoppingBagIcon, UserIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userStore = useAuthStore();
const { user } = storeToRefs(userStore);
const items = [
  {
    label: "الاسم",
    value: user.value.name,
  },
  {
    label: "الايميل",
    value: user.value.email ?? "غير معروف",
  },
  {
    label: "رقم الهاتف",
    value: user.value.phone ?? "غير معروف",
  },
];

const accountOptionsType = [
  { id: "1", name: "مستهلك", label: "حساب تجاري" },
  { id: "2", name: "تاجر", label: "حساب مستهلك" },
];

const merchantSettings = [
  {
    label: "اسم المحل",
    value: "متجر احمد للمواد الغذائية",
  },
  {
    label: "عنوان المحل",
    value: "شارع الوحدة, غزة فلسطين",
  },
];

const selectedAccountType = computed({
  get() {
    return user.value.role === "merchant"
      ? accountOptionsType[1]
      : accountOptionsType[0];
  },
  set(value) {
    user.value.role = value.name === "تاجر" ? "merchant" : "customer";
  },
});

const storeImage = ref(null);
const previewUrl = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    storeImage.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};
</script>

<template>
  <SecandryTitle label="اعدادات الحساب" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <template v-for="item in items" :key="item.label">
      <SingleSettingAccountBox
        :label="item.label"
        :value="item.value"
        class="dark:text-white"
      />
    </template>
    <div
      class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 dark:border-gray-700"
    >
      <span
        class="text-gray-600 dark:text-gray-300 font-[500] text-[14px] mb-3 block"
      >
        نوع الحساب
      </span>
      <div class="flex justify-between items-center">
        <SelectListBox
          :options="accountOptionsType"
          v-model="selectedAccountType"
        />
        <div class="flex items-center gap-2">
          <span class="text-green-600 dark:text-green-400">
            <UserIcon
              class="w-5"
              v-if="selectedAccountType.name === 'مستهلك'"
            />
            <ShoppingBagIcon class="w-5 h-5" v-else />
          </span>
          <span class="text-[14px] font-[400] text-gray-600 dark:text-gray-300">
            {{ selectedAccountType.label }}
          </span>
        </div>
      </div>
    </div>
    <template v-if="selectedAccountType.name == 'تاجر'">
      <template v-for="item in merchantSettings" :key="item.label">
        <SingleSettingAccountBox
          :label="item.label"
          :value="item.value"
          class="dark:text-white"
        />
      </template>
      <div
        class="last-of-type:border-none border-b last-of-type:p-0 pb-3 mt-4 first-of-type:mt-0 dark:border-gray-700"
      >
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <span
              class="text-gray-600 dark:text-gray-300 font-[500] text-[14px] mb-3 block"
            >
              صورة المتجر
            </span>
            <label
              for="store_image"
              class="w-fit border rounded-lg py-2 px-4 text-[12px] font-[500] transition cursor-pointer border-gray-200 hover:bg-gray-100 focus:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              {{
                user.store?.image || previewUrl ? "تعديل الصورة" : "اضافة صورة"
              }}
            </label>
            <input
              type="file"
              hidden
              id="store_image"
              accept="image/*"
              @change="handleImageChange"
            />
          </div>
          <div v-if="previewUrl" class="mt-4">
            <img
              :src="previewUrl"
              alt="معاينة الصورة"
              class="w-1/3 object-cover rounded-md mx-auto"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
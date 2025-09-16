<script setup>
import { computed, onMounted, ref, watch } from "vue";
import SecandryTitle from "./global/SecandryTitle.vue";
import SingleSettingAccountBox from "./SingleSettingAccountBox.vue";
import BaseSwitch from "./global/BaseSwitch.vue";
import SingleFavoriteStraucture from "./SingleFavoriteStraucture.vue";
import ConfirmDeleteDialog from "../dashboard/global/ConfirmDeleteDialog.vue";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";
import { useCityStore } from "../../stores/city";
import SelectListBox from "./global/SelectListBox.vue";
const twoFA = ref(false);
const deleteDialog = ref({
  dialog: false,
});
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const password = ref("password");
const currentPassword = ref("");
const currentPasswordDialog = ref(false);
const isDeleteAccount = ref(false);
const cityStore = useCityStore();
const { cities } = storeToRefs(cityStore);

const location = ref(false);
// watch(
//   () => location.value,
//   (newVal) => {
//     user.value.city?.id ? (location.value = true) : (location.value = false);
//     // set: (value) => (location.value = value),
//   },
//   {
//     immediate: true,
//   }
// );
const openConfirmPasswordDialog = () => {
  currentPasswordDialog.value = true;
  currentPassword.value = "";
  isDeleteAccount.value = deleteDialog.value.dialog;
};

const update = async () => {
  if (isDeleteAccount.value) {
    await deleteAccount(currentPassword.value);
    return;
  }
  if (
    (password.value == "" && password.value == "password") ||
    currentPassword.value == ""
  ) {
    password.value = "password";
    return;
  }
  try {
    await authStore.update({
      password: password.value,
      current_password: currentPassword.value,
    });
    password.value = "password";
  } catch (error) {
    console.error("Error updating password:", error);
  }
};
watch(
  () => user.value.city,
  async (newVal) => {
    await authStore.update({
      city_id: newVal.id,
    });
  }
);
watch(
  () => user.value.share_location,
  async (newVal) => {
    await authStore.update(
      {
        share_location: +newVal,
      },
      false
    );
  }
);

const deleteAccount = async (password) => {
  try {
    await authStore.deleteAccount(password);
    deleteDialog.value.dialog = false;
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};
onMounted(async () => {
  await cityStore.fetchAllCities();
});
</script>

<template>
  <SecandryTitle label="الخصوصية و الامان" class="mb-3" />
  <div
    class="border rounded-xl p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <SingleSettingAccountBox
      label="كلمة المرور"
      v-model:value="password"
      input-type="password"
      id="password"
      @update="openConfirmPasswordDialog"
    />
    <!-- <SingleFavoriteStraucture
      title="التحقق بخطوتين"
      description="تفعيل طبقة امان اضافية"
    >
      <template #action>
        <BaseSwitch v-model:model-value="twoFA" />
      </template>
    </SingleFavoriteStraucture> -->
    <SingleFavoriteStraucture
      title="مشاركة الموقع"
      description="السماح بمشاركة موقعك"
    >
      <template #action>
        <BaseSwitch v-model:model-value="user.share_location" />
      </template>
      <SelectListBox
        v-if="user.share_location"
        class="w-full"
        v-model="user.city"
        :options="cities"
        label="اختر المدينة التي تقيم فيها"
      />
    </SingleFavoriteStraucture>
    <div class="mt-4">
      <p class="text-red-600 font-[500] text-[16px] mb-3 block">منطقة خطر</p>
      <button
        @click="deleteDialog.dialog = true"
        class="font-[500] text-white bg-red-600 hover:bg-red-700 transition-opacity rounded-lg w-full block py-3"
      >
        حذف الحساب
      </button>
      <p class="text-[12px] text-gray-500 mt-2 text-center font-[400]">
        حذف الحساب سوف يؤدي الي فقدان جميع البيانات بشكل نهائي
      </p>
    </div>
  </div>
  <ConfirmDeleteDialog
    v-model="deleteDialog.dialog"
    title="حذف الحساب"
    message="هل أنت متأكد من رغبتك بحذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه."
    button-label="حذف الحساب"
    @confirm="openConfirmPasswordDialog"
  />
  <ConfirmDeleteDialog
    v-model="currentPasswordDialog"
    title="تأكيد كلمة المرور"
    message="يرجى إدخال كلمة المرور الحالية لتأكيد التغيير."
    button-label="تأكيد"
    @confirm="update"
  >
    <input
      type="password"
      v-model="currentPassword"
      class="rounded-md w-full p-[6px] block placeholder:text-[14px] font-[500] bg-gray-100 text-blue-950 focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-400 dark:focus:ring-gray-400"
      placeholder="كلمة المرور"
    />
  </ConfirmDeleteDialog>
</template>

<!-- views/dashboard/DashboardView.vue -->
<template>
  <div>
    <HeaderPage title="لوحة التحكم-الرئيسية" :is-has-add-button="false" />
  </div>

  <div class="flex flex-wrap justify-evenly gap-4 mx-4 mt-6">
    <template v-for="item in cardItems" :key="item.title">
      <div
        class="border-2 rounded-xl flex items-center justify-center gap-6 lg:gap-8 h-40 text-[22px] lg:text-[28px] font-[400] w-[280px] lg:w-[340px] transition-colors duration-200"
        :class="item.style">
        <component :is="item.icon" class="w-12 lg:w-14" />
        <div class="flex items-center flex-col justify-center gap-4">
          <span>{{ item.title }}</span>
          <span class="font-[500] text-2xl lg:text-4xl">{{ item.number }}</span>
        </div>
      </div>
    </template>
  </div>

  <div class="flex flex-col items-stretch lg:flex-row gap-4 mt-8 pb-6 h-full">
    <div class="overflow-x-auto scrollbar-hide h-full self-stretch shadow-md dark:shadow-gray-700 rounded-lg">
      <div class="min-w-[750px] h-[25rem]">
        <div
          class="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-6 pb-3 transition-colors duration-200">
          <div class="flex justify-between items-center mb-6">
            <h4 class="text-blue-500 text-[20px] font-[500]">
              اخر المستخدمين انضماما
            </h4>
            <button @click="$router.push({ name: 'dashboard-user' })"
              class="border-2 text-[12px] text-blue-500 border-blue-500 rounded-lg px-3 py-[6px] font-[400] transition-all duration-200 hover:bg-blue-500 hover:text-white">
              عرض المزيد
            </button>
          </div>
          <div class="text-[14px]">
            <div class="row grid grid-cols-8 gap-4 mb-2 font-[400] text-gray-800 dark:text-gray-200">
              <span>رقم المستخدم</span>
              <span>اسم المستخدم</span>
              <span class="col-span-2 text-center">ايميل المستخدم</span>
              <span>رقم الهاتف</span>
              <span>الدور</span>
              <span class="col-span-2">تاريخ الاضمام</span>
            </div>
            <div
              class="row grid grid-cols-8 gap-4 py-4 border-b last-of-type:border-none text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
              v-for="user in users" :key="user.id">
              <span class="text-center"># {{ user.id }}</span>
              <span>{{ user.name }}</span>
              <span class="col-span-2 text-center">{{ user.email }}</span>
              <span class="text-end" dir="ltr">{{ user.phone }}</span>
              <span>{{ user.role }}</span>
              <span class="col-span-2">{{
                user.created_at ?? "8-8-2020"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white border border-gray-200 overflow-hidden dark:bg-gray-800 dark:shadow-gray-700 dark:border-gray-700 shadow-md rounded-lg p-6 pb-3 flex-1 max-h-[25rem] min-w-[280px] transition-colors duration-200"
      :class="{ 'overflow-y-auto': showAll }">
      <div class="flex justify-between items-center gap-6 mb-6">
        <h4 class="text-blue-500 text-[20px] font-[500] text-nowrap">
          اخر الاشعارات
        </h4>
        <button v-if="notifications.data?.length > 4" @click="showAll = !showAll"
          class="border-2 text-[12px] text-nowrap text-blue-500 border-blue-500 rounded-lg px-3 py-[6px] font-[400] transition-all duration-200 hover:bg-blue-500 hover:text-white">
          {{ showAll ? "عرض أقل" : "عرض الكل" }}
        </button>
      </div>
      <template v-if="notifications.data?.length > 0">
        <div
          class="box-notification flex items-center gap-4 py-4 border-b border-b-gray-200 dark:border-b-gray-700 last-of-type:border-none"
          v-for="notification in notifications.data" :key="notification.id">
          <component :is="getIcon(notification.data.icon_type)" class="w-6 text-gray-800 dark:text-gray-200" />
          <div class="flex flex-col gap-[2px]">
            <span class="text-gray-800 dark:text-gray-200 font-[400] text-[14px]">
              {{ notification.data.title }}
            </span>
            <span class="text-gray-600 dark:text-gray-400 text-[12px]">
              {{ notification.data.text }}
            </span>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="flex justify-center items-center h-[50%] text-sm font-[400] text-gray-800 dark:text-gray-200">
          لا يوجد اي اشعارات حتى الان
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  ArchiveBoxIcon,
  BellIcon,
  FlagIcon,
  ShoppingBagIcon,
  UserIcon,
  BuildingStorefrontIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import { onMounted, reactive, ref } from "vue";
import axiosClient from "../../axiosClient";
import format from "../../mixins/formats";

const { formatDate } = format();
const showAll = ref(false);
const cardItems = reactive([
  {
    title: "المنتجات",
    icon: ShoppingBagIcon,
    style: "bg-amber-100 text-amber-600 border-amber-200",
    number: 0,
  },
  {
    title: "التصنيفات",
    icon: ArchiveBoxIcon,
    style: "bg-blue-100 text-blue-600 border-blue-200",
    number: 0,
  },
  {
    title: "المستخدمين",
    icon: UsersIcon,
    style: "bg-green-100 text-green-600 border-green-200",
    number: 0,
  },
]);

const users = ref([]);

const notifications = ref([]);
const translateRole = (role) => {
  switch (role) {
    case "admin":
      return "مدير";
    case "merchant":
      return "تاجر";
    case "customer":
      return "مستهلك";
    default:
      return "غير معروف";
  }
};
const getIcon = (icon) => {
  switch (icon) {
    case "user":
      return UserIcon;
    case "report":
      return FlagIcon;
    case "store":
      return BuildingStorefrontIcon;
    default:
      return BellIcon;
  }
};

onMounted(async () => {
  try {
    const response = await axiosClient.get("/admin/dashboard");
    users.value = response.data.last_users_register.map((ele) => {
      console.log(ele.role);
      console.log(translateRole(ele.role));
      return {
        id: ele.id,
        name: ele.name,
        email: ele.email ?? "غير مسجل",
        phone: ele.phone ?? "غير مسجل",
        role: translateRole(ele.role),
        created_at: formatDate(ele.created_at),
      };
    });
    cardItems[0].number = response.data.products_count;
    cardItems[1].number = response.data.categories_count;
    cardItems[2].number = response.data.users_count;
  } catch (e) {
  }

  try {
    const response = await axiosClient.get("admin/notifications");
    if (response.status == 200) {
      notifications.value = response.data.notifications;
    }
  } catch (e) {
  }
});
</script>

<style lang="scss" scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Firefox */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
</style>
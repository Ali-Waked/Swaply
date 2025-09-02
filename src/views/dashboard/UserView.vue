<template>
  <HeaderPage title="المستخدمون" :is-has-add-button="false" />

  <GenericDataTable :headers="headers" :items="users">
    <template #actions="item">
      <div class="flex gap-2 justify-center">
        <button
          @click="openEditModal(item.item)"
          class="bg-blue-500 text-white px-3 py-1 rounded"
        >
          تعديل
        </button>
        <button
          @click="deleteUser(item.item)"
          class="bg-red-500 text-white px-3 py-1 rounded"
        >
          حذف
        </button>
      </div>
    </template>

    <template #prev-icon>
      <ChevronDoubleRightIcon class="w-5" />
    </template>

    <template #next-icon>
      <ChevronDoubleLeftIcon class="w-5" />
    </template>
  </GenericDataTable>

  <AddOrEditUserDialog v-model="showDialog" :mode="mode" :user="user" />

  <ConfirmDeleteDialog
    v-model="showDeleteDialog"
    :message="confirmMessage"
    @confirm="ConfirmDelete"
  />
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
// import AddOrEditUserDialog from "../../components/dashboard/AddOrEditUserDialog.vue";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

// الأعمدة
const headers = [
  { text: "رقم المستخدم", value: "userId", sortable: true },
  { text: "اسم المستخدم", value: "username", sortable: true },
  { text: "البريد الإلكتروني", value: "useremail", sortable: true },
  { text: "رقم الهاتف", value: "userphone", sortable: true },
  { text: "الدور", value: "role", sortable: true },
  { text: "إجراءات", value: "actions" },
];

// بيانات وهمية
const users = ref([
  {
    userId: 1,
    username: "Ali Waked",
    useremail: "ali@example.com",
    userphone: "0591234567",
    role: "Admin",
  },
  {
    userId: 2,
    username: "Sara Ahmad",
    useremail: "sara@example.com",
    userphone: "0597654321",
    role: "Moderator",
  },
  {
    userId: 3,
    username: "Omar Khaled",
    useremail: "omar@example.com",
    userphone: "0591122334",
    role: "User",
  },
]);

// تعديل أو إضافة مستخدم
const mode = ref("create");
const user = ref({});
const showDialog = ref(false);

const openDialog = (type, usr = {}) => {
  mode.value = type;
  user.value = usr;
  showDialog.value = true;
};

const openEditModal = (usr) => {
  openDialog("edit", usr);
};

// حذف المستخدم
const showDeleteDialog = ref(false);
const confirmMessage = ref("");
const selectedUser = reactive({});
const emitter = inject("emitter");

const deleteUser = ({ userId, username = "" }) => {
  confirmMessage.value = `هل أنت متأكد من رغبتك بحذف المستخدم "${username}"؟`;
  selectedUser.username = username;
  selectedUser.userId = userId;
  showDeleteDialog.value = true;
};

const ConfirmDelete = () => {
  users.value = users.value.filter((u) => u.userId !== selectedUser.userId);
  emitter.emit("showNotificationAlert", ["success", "تم حذف المستخدم بنجاح!"]);
};
</script>

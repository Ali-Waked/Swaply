<template>
  <HeaderPage
    title="المنتجات"
    ButtonLabel="اضافة منتج جديد"
    @button-add-click="openDialog('create')"
  />

  <GenericDataTable :headers="headers" :items="items">
    <template #actions="item">
      <div class="flex gap-2 justify-center">
        <button
          @click="openEditModal(item.item)"
          class="bg-blue-500 text-white px-3 py-1 rounded"
        >
          تعديل
        </button>
        <button
          @click="deleteProduct(item.item)"
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

  <AddOrEditProductDialog
    v-model="showDialog"
    :mode="mode"
    :product="product"
  />

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
import AddOrEditProductDialog from "../../components/dashboard/AddOrEditProductDialog.vue";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

const headers = [
  { text: "رقم المنتج", value: "id", sortable: true },
  { text: "اسم المنتج", value: "name", sortable: true },
  { text: "اسم التصنيف", value: "category_name", sortable: true }, // ✅ جديد
  { text: "تاريخ الإضافة", value: "created_at", sortable: true },
  { text: "إجراءات", value: "actions" },
];

// بيانات المنتجات كمثال
const items = ref([
  {
    id: 1,
    name: "هاتف ذكي",
    category_name: "إلكترونيات",
    created_at: "2025-09-01",
  },
  {
    id: 2,
    name: "لابتوب",
    category_name: "إلكترونيات",
    created_at: "2025-08-28",
  },
  {
    id: 3,
    name: "طابعة",
    category_name: "أجهزة مكتبية",
    created_at: "2025-08-25",
  },
  {
    id: 4,
    name: "سماعات",
    category_name: "إلكترونيات",
    created_at: "2025-08-20",
  },
]);

// تعديل أو إضافة منتج
const mode = ref("create"); // create أو edit
const product = ref({});
const showDialog = ref(false);

const openDialog = (type, prod = {}) => {
  mode.value = type;
  product.value = prod;
  showDialog.value = true;
};

const openEditModal = (prod) => {
  openDialog("edit", prod);
};

// حذف المنتج
const showDeleteDialog = ref(false);
const confirmMessage = ref("");
const selectedProduct = reactive({});
const emitter = inject("emitter");

const deleteProduct = ({ id, name = "" }) => {
  confirmMessage.value = `هل أنت متأكد من رغبتك بحذف المنتج "${name}"؟`;
  selectedProduct.name = name;
  selectedProduct.id = id;
  showDeleteDialog.value = true;
};

const ConfirmDelete = () => {
  items.value = items.value.filter((i) => i.id !== selectedProduct.id);
  emitter.emit("showNotificationAlert", ["success", "تم حذف المنتج بنجاح!"]);
};
</script>

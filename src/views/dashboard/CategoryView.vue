<template>
  <HeaderPage
    title="التصنيفات"
    ButtonLabel="اضافة تصنيف جديد"
    @button-add-click="openDialog('created')"
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
          @click="deleteCategory(item.item)"
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
  <AddOrEditCategoryDialog
    v-model="showDialog"
    :mode="mode"
    :category="category"
  />
  <ConfirmDeleteDialog
    v-model="showDeleteDialog"
    :message="confirmMessage"
    @confirm="ConfirmDelete"
  />
</template>

<script setup>
import { ref, reactive, computed, inject } from "vue";
import "vue3-easy-data-table/dist/style.css";
import "@mdi/font/css/materialdesignicons.min.css";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import AddOrEditCategoryDialog from "../../components/dashboard/AddOrEditCategoryDialog.vue";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

const headers = [
  { text: "رقم التصنيف", value: "id", sortable: true },
  { text: "اسم التصنيف", value: "name", sortable: true },
  { text: "تاريخ الإضافة", value: "created_at", sortable: true }, // ✅ التاريخ
  { text: "إجراءات", value: "actions" },
];

// البيانات
const items = ref([
  { id: 1, name: "الإلكترونيات", created_at: "2025-09-01" },
  { id: 2, name: "الأثاث", created_at: "2025-08-30" },
  { id: 3, name: "الأجهزة المنزلية", created_at: "2025-08-28" },
  { id: 4, name: "الملابس", created_at: "2025-08-25" },
]);

// تعديل
const editForm = reactive({ id: null, name: "" });
const showModal = ref(false);

const openEditModal = (category) => {
  console.log(category);
  openDialog("edit", category);
};
const closeModal = () => (showModal.value = false);
const submitEdit = () => {
  const idx = items.value.findIndex((i) => i.id === editForm.id);
  if (idx !== -1) items.value[idx] = { ...editForm };
  closeModal();
};

const mode = ref("create"); // "create" أو "edit"
const category = ref([]);
const showDialog = ref(false);
const showDeleteDialog = ref(false);
const confirmMessage = ref("");
const selectedCategory = reactive({});
const emitter = inject("emitter");

const deleteCategory = ({ id, name = "" }) => {
  confirmMessage.value = `هل أنت متأكد من رغبتك بحذف التصنيف "${name}"؟`;
  selectedCategory.name = name;
  selectedCategory.id = id;
  showDeleteDialog.value = true;
};

const ConfirmDelete = () => {
  items.value = items.value.filter((i) => i.id !== selectedCategory.id);
  emitter.emit("showNotificationAlert", ["success", "تم حذف المنتج بنجاح!"]);
};

const openDialog = (type, cat = {}) => {
  mode.value = type;
  category.value = cat;
  showDialog.value = true;
};
</script>

<style scoped lang="scss">
.customize-table {
  --easy-table-border: 1px solid #ddd;
  --easy-table-row-border: 1px solid #eee;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #333;
  --easy-table-header-background-color: #f8f9fa;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #333;
  --easy-table-body-even-row-background-color: #fdfdfd;

  --easy-table-body-row-font-color: #333;
  --easy-table-body-row-background-color: #ffffff;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #000;
  --easy-table-body-row-hover-background-color: #f1f5f9;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #f8f9fa;
  --easy-table-footer-font-color: #333;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #f1f1f1;
  --easy-table-scrollbar-color: #f1f1f1;
  --easy-table-scrollbar-thumb-color: #c1c1c1;
  --easy-table-scrollbar-corner-color: #f1f1f1;

  --easy-table-loading-mask-background-color: #ffffffd9;
}
</style>
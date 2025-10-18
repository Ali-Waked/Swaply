<template>
  <HeaderPage title="التصنيفات" ButtonLabel="اضافة تصنيف جديد" @button-add-click="openDialog('create')" />

  <div class="mb-4">
    <input v-model="searchQuery" type="text" placeholder="ابحث عن تصنيف..."
      class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" />
  </div>

  <GenericDataTable :headers="headers" :items="filteredItems">
    <template #id="{ item }">
      <span># {{ item.id }}</span>
    </template>
    <template #actions="item">
      <div class="flex gap-2 justify-center">
        <button @click="openEditModal(item.item)" class="bg-blue-500 text-white px-3 py-1 rounded">
          تعديل
        </button>
        <button @click="deleteCategory(item.item)" class="bg-red-500 text-white px-3 py-1 rounded">
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

  <AddOrEditCategoryDialog v-model="showDialog" :mode="mode" v-model:category="category"
    @fetch-categories="fetchCategories" />
  <ConfirmDeleteDialog v-model="showDeleteDialog" :message="confirmMessage" @confirm="ConfirmDelete" />
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted } from "vue";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import AddOrEditCategoryDialog from "../../components/dashboard/AddOrEditCategoryDialog.vue";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import axiosClient from "../../axiosClient";
import format from "../../mixins/formats";

const headers = [
  { text: "رقم التصنيف", value: "id", sortable: true },
  { text: "اسم التصنيف", value: "name", sortable: true },
  { text: "تاريخ الإضافة", value: "created_at", sortable: true },
  { text: "إجراءات", value: "actions" },
];

const items = ref([]);
const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const { formatDate, cleanId } = format();
const mode = ref("create");
const category = ref({});
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

const ConfirmDelete = async () => {
  const response = await axiosClient.delete(
    `admin/categories/${cleanId(selectedCategory.id)}`
  );
  if (response.status == 200) {
    items.value = items.value.filter((i) => i.id !== selectedCategory.id);
    emitter.emit("showNotificationAlert", ["success", "تم حذف التصنيف بنجاح!"]);
  }
};

const openDialog = (type, cat = {}) => {
  mode.value = type;
  category.value = cat;
  showDialog.value = true;
};

const openEditModal = (cat) => {
  const selectedCat = items.value.filter(
    (ele) => ele.id == cleanId(cat.id)
  )[0];
  openDialog("edit", selectedCat);
};

const fetchCategories = async () => {
  try {
    const response = await axiosClient.get("/admin/categories");
    items.value = response.data.categories.map((ele) => ({
      id: ele.id,
      name: ele.name,
      description: ele.description,
      created_at: formatDate(ele.created_at),
    }));
  } catch (e) {
  }
};

onMounted(async () => {
  await fetchCategories();
});
</script>

<template>
  <div class="p-4" dir="rtl">
    <EasyDataTable
      ref="dataTable"
      :headers="headers"
      :items="itemsComputed"
      :pagination="true"
      :search="true"
      :sortable="true"
      hide-footer
      class="text-right"
    >
      <template #cell-actions="{ item }">
        <div class="flex gap-2 justify-start">
          <button
            @click="viewUser(item)"
            class="flex items-center px-3 py-1 bg-green-500 text-white rounded"
          >
            <i class="mdi mdi-eye-outline ml-1"></i> عرض
          </button>
          <button
            @click="openEditModal(item)"
            class="flex items-center px-3 py-1 bg-blue-500 text-white rounded"
          >
            <i class="mdi mdi-pencil-outline ml-1"></i> تعديل
          </button>
          <button
            @click="deleteUser(item.number)"
            class="flex items-center px-3 py-1 bg-red-500 text-white rounded"
          >
            <i class="mdi mdi-delete-outline ml-1"></i> حذف
          </button>
        </div>
      </template>
    </EasyDataTable>

    <!-- Custom Footer -->
    <div class="flex justify-between items-center mt-4 bg-gray-100 p-3 rounded">
      <!-- Rows per page -->
      <div>
        <label>عدد الصفوف لكل صفحة:</label>
        <select
          @change="updateRowsPerPageSelect"
          class="border px-2 py-1 rounded"
        >
          <option
            v-for="item in rowsPerPageOptions"
            :key="item"
            :value="item"
            :selected="item === rowsPerPageActiveOption"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <!-- Displayed items -->
      <div>
        عرض: {{ currentPageFirstIndex }} ~ {{ currentPageLastIndex }} من
        {{ clientItemsLength }}
      </div>

      <!-- Pagination -->
      <div class="flex gap-2 items-center">
        <button
          @click="prevPage"
          :disabled="isFirstPage"
          class="px-2 py-1 border rounded"
        >
          السابق
        </button>
        <span
          v-for="page in maxPaginationNumber"
          :key="page"
          @click="updatePage(page)"
          :class="{
            'bg-blue-500 text-white px-2 py-1 rounded cursor-pointer':
              page === currentPaginationNumber,
            'px-2 py-1 rounded cursor-pointer':
              page !== currentPaginationNumber,
          }"
        >
          {{ page }}
        </span>
        <button
          @click="nextPage"
          :disabled="isLastPage"
          class="px-2 py-1 border rounded"
        >
          التالي
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import "@mdi/font/css/materialdesignicons.min.css";

const dataTable = ref();

const headers = ref([
  { text: "اللاعب", value: "اللاعب" },
  { text: "الفريق", value: "الفريق" },
  { text: "الرقم", value: "الرقم" },
  { text: "المركز", value: "المركز" },
  { text: "الطول", value: "مؤشر.الطول" },
  { text: "الوزن (رطل)", value: "مؤشر.الوزن", sortable: true },
  { text: "آخر مدرسة", value: "آخر_حضور" },
  { text: "البلد", value: "البلد" },
  { text: "إجراءات", value: "إجراءات", sortable: false },
]);

const items = ref([
  {
    اللاعب: "ستيفن كاري",
    الفريق: "GSW",
    الرقم: 30,
    المركز: "G",
    مؤشر: { الطول: "6-2", الوزن: 185 },
    آخر_حضور: "ديفيدسون",
    البلد: "USA",
  },
  {
    اللاعب: "ليبرون جيمس",
    الفريق: "LAL",
    الرقم: 6,
    المركز: "F",
    مؤشر: { الطول: "6-9", الوزن: 250 },
    آخر_حضور: "St. Vincent-St. Mary HS (OH)",
    البلد: "USA",
  },
  {
    اللاعب: "كيفن دورانت",
    الفريق: "BKN",
    الرقم: 7,
    المركز: "F",
    مؤشر: { الطول: "6-10", الوزن: 240 },
    آخر_حضور: "Texas-Austin",
    البلد: "USA",
  },
  {
    اللاعب: "جيانيس أنتيتوكونمبو",
    الفريق: "MIL",
    الرقم: 34,
    المركز: "F",
    مؤشر: { الطول: "6-11", الوزن: 242 },
    آخر_حضور: "Filathlitikos",
    البلد: "Greece",
  },
]);

const itemsComputed = computed(() => items.value || []);

const editForm = reactive({ player: "", team: "", number: null, position: "" });
const showModal = ref(false);
const viewForm = reactive({ player: "", team: "", number: null, position: "" });
const showViewModal = ref(false);

const openEditModal = (player) => {
  Object.assign(editForm, player);
  showModal.value = true;
};
const closeModal = () => (showModal.value = false);
const submitEdit = () => {
  const idx = items.value.findIndex((i) => i.number === editForm.number);
  if (idx !== -1)
    items.value[idx] = { ...editForm, indicator: items.value[idx].indicator };
  closeModal();
};
const deleteUser = (number) => {
  items.value = items.value.filter((i) => i.number !== number);
};
const viewUser = (item) => {
  Object.assign(viewForm, item);
  showViewModal.value = true;
};
const closeViewModal = () => (showViewModal.value = false);

// Footer pagination logic
const currentPageFirstIndex = computed(
  () => dataTable.value?.currentPageFirstIndex
);
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const currentPaginationNumber = computed(
  () => dataTable.value?.currentPaginationNumber
);
const isFirstPage = computed(() => dataTable.value?.isFirstPage);
const isLastPage = computed(() => dataTable.value?.isLastPage);
const nextPage = () => dataTable.value.nextPage();
const prevPage = () => dataTable.value.prevPage();
const updatePage = (n) => dataTable.value.updatePage(n);
const rowsPerPageOptions = computed(() => dataTable.value?.rowsPerPageOptions);
const rowsPerPageActiveOption = computed(
  () => dataTable.value?.rowsPerPageActiveOption
);
const updateRowsPerPageSelect = (e) =>
  dataTable.value.updateRowsPerPageActiveOption(Number(e.target.value));
</script>

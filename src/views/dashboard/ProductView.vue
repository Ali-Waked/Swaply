<template>
  <HeaderPage
    title="المنتجات"
    ButtonLabel="اضافة منتج جديد"
    @button-add-click="openDialog('create')"
  />

  <div class="mb-4">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="ابحث عن منتج معين..."
      class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>

  <GenericDataTable :headers="headers" :items="filteredItems">
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
    v-model:product="product"
    @fetchProducts="fetchProducts"
  />

  <ConfirmDeleteDialog
    v-model="showDeleteDialog"
    :message="confirmMessage"
    @confirm="ConfirmDelete"
  />
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
import AddOrEditProductDialog from "../../components/dashboard/AddOrEditProductDialog.vue";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import axiosClient from "../../axiosClient";
import format from "../../mixins/formats";

const headers = [
  { text: "رقم المنتج", value: "id", sortable: true },
  { text: "اسم المنتج", value: "name", sortable: true },
  { text: "سعر المنتج", value: "price", sortable: true },
  { text: "اسم التصنيف", value: "category_name", sortable: true }, // ✅ جديد
  { text: "تاريخ الإضافة", value: "created_at", sortable: true },
  { text: "إجراءات", value: "actions" },
];
const { formatDate, cleanId, currencyFormat } = format();
// بيانات المنتجات كمثال
const items = ref([]);

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
  const selectedPro = products.value.filter(
    (ele) => ele.id == cleanId(prod.id)
  )[0];
  console.log(selectedPro);
  openDialog("edit", selectedPro);
};

const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const showDeleteDialog = ref(false);
const confirmMessage = ref("");
const selectedProduct = reactive({});
const emitter = inject("emitter");
const products = ref({
  name: null,
  price: null,
  category_id: null,
});

const deleteProduct = ({ id, name = "" }) => {
  confirmMessage.value = `هل أنت متأكد من رغبتك بحذف المنتج "${name}"؟`;
  selectedProduct.name = name;
  selectedProduct.id = id;
  showDeleteDialog.value = true;
};

const ConfirmDelete = async () => {
  const response = await axiosClient.delete(
    `admin/products/${cleanId(selectedProduct.id)}`
  );
  if (response.status == 204) {
    items.value = items.value.filter((i) => i.id !== selectedProduct.id);
    emitter.emit("showNotificationAlert", ["success", "تم حذف المنتج بنجاح!"]);
  }
};

const fetchProducts = async () => {
  try {
    await axiosClient.get("/admin/products").then((response) => {
      products.value = response.data.products;
      items.value = response.data.products.map((ele) => {
        return {
          id: `# ${ele.id}`,
          name: ele.name,
          category_name: ele.category.name,
          price: currencyFormat(ele.price, undefined, "ar", "ILS"),
          created_at: formatDate(ele.created_at),
        };
      });
      // console.log(response);
    });
  } catch (e) {
    // console.error(e);
  }
};

onMounted(async () => {
  await fetchProducts();
});
</script>

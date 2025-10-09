<template>
  <HeaderPage title="المتاجر" :is-has-add-button="false" />

  <GenericDataTable :headers="headers" :items="items">
    <template #id="{ item }">
      <span># {{ item.id }}</span>
    </template>
    <template #image="{ item }">
      <img
        :src="item.image"
        alt="store image"
        class="min-w-16 max-w-20 h-16 object-cover rounded cursor-pointer"
        @click="openImageDialog(item.image)"
      />
    </template>

    <template #actions="item">
      <div class="flex gap-2 justify-center">
        <button
          @click="changeStatusDialog(item.item)"
          class="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          تغيير الحالة
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

  <div
    v-if="showImageDialog"
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click.self="closeImageDialog"
  >
    <img
      :src="selectedImage"
      class="max-w-4xl max-h-[90vh] rounded shadow-lg"
    />
  </div>
  <ChangeStoreStatus
    v-model="statusDialog.is_open"
    :store="statusDialog.data"
    v-model:store-status="statusDialog.status"
    @fetch-stores="fetchStores"
  />
</template>

<script setup>
import { ref, onMounted, inject, reactive } from "vue";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import axiosClient from "../../axiosClient";
import format from "../../mixins/formats";
import ChangeStoreStatus from "../../components/dashboard/ChangeStoreStatus.vue";

const headers = [
  { text: "صورة", value: "image", sortable: false },
  { text: "رقم المتجر", value: "id", sortable: true },
  { text: "اسم المتجر", value: "name", sortable: true },
  { text: "رقم الهاتف", value: "phone", sortable: true },
  { text: "الموقع", value: "location", sortable: false },
  { text: "العنوان", value: "address", sortable: false },
  { text: "الحالة", value: "status", sortable: true },
  { text: "إجراءات", value: "actions" },
];

const statusDialog = reactive({
  is_open: false,
  data: {},
});

const changeStatusDialog = (item) => {
  statusDialog.is_open = true;
  statusDialog.data = item;
};

const translateStatus = (status) => {
  switch (status) {
    case "active":
      return "نشط";
    case "inactive":
      return "غير نشط";
    case "pending":
      return "معلق";
    default:
      return "غير معروف";
  }
};

const items = ref([]);
const stores = ref([]);
const { formatDate, cleanId } = format();
const emitter = inject("emitter");

// 🔹 تكبير الصورة
const showImageDialog = ref(false);
const selectedImage = ref(null);

const openImageDialog = (image) => {
  selectedImage.value = image;
  showImageDialog.value = true;
};
const closeImageDialog = () => {
  showImageDialog.value = false;
  selectedImage.value = null;
};

const toggleStatus = async (store) => {
  try {
    const response = await axiosClient.patch(
      `/admin/stores/${cleanId(store.id)}/toggle-status`
    );
    if (response.status === 200) {
      emitter.emit("showNotificationAlert", [
        "success",
        "تم تغيير حالة المتجر بنجاح!",
      ]);
      await fetchStores();
    }
  } catch (e) {
    // console.error(e);
  }
};

const fetchStores = async () => {
  try {
    const response = await axiosClient.get("/admin/stores");
    stores.value = response.data.data;
    items.value = response.data.data.map((ele) => {
      return {
        id: ele.id,
        name: ele.name,
        phone: ele.user.phone ?? "غير مسجل",
        location: ele.city?.name ?? "غير محدد",
        address: ele.address ?? "غير محدد",
        image: ele.image,
        status: translateStatus(ele.status),
        created_at: formatDate(ele.created_at),
      };
    });
  } catch (e) {
    // console.error(e);
  }
};

onMounted(async () => {
  await fetchStores();
});
</script>

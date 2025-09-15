<template>
  <HeaderPage title="البلاغات" :is-has-add-button="false" />

  <GenericDataTable :headers="headers" :items="filteredItems">
    <template #actions="item">
      <div class="flex justify-center">
        <button
          v-if="item.item.status !== 'reviewed'"
          @click="markAsReviewed(item.item)"
          class="text-blue-600 hover:underline"
        >
          مراجعة البلاغ
        </button>
        <span
          v-else
          class="px-3 py-1 rounded bg-green-600 text-white cursor-default"
        >
          تمت المراجعة
        </span>
      </div>
    </template>

    <template #prev-icon>
      <ChevronDoubleRightIcon class="w-5" />
    </template>

    <template #next-icon>
      <ChevronDoubleLeftIcon class="w-5" />
    </template>
  </GenericDataTable>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import HeaderPage from "../../components/dashboard/global/HeaderPage.vue";
import GenericDataTable from "../../components/dashboard/global/GenericDataTable.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import axiosClient from "../../axiosClient";
import { useForm } from "vee-validate";
import useFormats from "../../mixins/formats";

const headers = [
  { text: "رقم المنتج", value: "product_id", sortable: true },
  { text: "صاحب المنتج", value: "owner_name", sortable: true },
  { text: "عدد مرات الإبلاغ", value: "report_count", sortable: true },
  { text: "إجراءات", value: "actions" },
];

const items = ref([]);
const searchQuery = ref("");
const emitter = inject("emitter");
const { formatDate, cleanId } = useFormats();

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.owner_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchReports = async () => {
  try {
    const response = await axiosClient.get("/admin/reports");
    items.value = response.data.data.map((ele) => ({
      id: ele.id,
      product_id: `#${ele.product_id}`,
      owner_name: ele.product.store.user.name,
      report_count: ele.report_count,
      status: ele.status,
    }));
  } catch (e) {
    console.error(e);
  }
};

const markAsReviewed = async (item) => {
  try {
    const response = await axiosClient.put(
      `/admin/products/${cleanId(item.product_id)}/report/make-reviewed`,
      {
        status: "reviewed",
      }
    );
    if (response.status === 200) {
      items.value = items.value.map((i) =>
        i.id === item.id ? { ...i, status: "reviewed" } : i
      );
      emitter.emit("showNotificationAlert", ["success", "تمت مراجعة البلاغ"]);
    }
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  await fetchReports();
});
</script>

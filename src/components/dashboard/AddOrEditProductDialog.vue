<script setup>
import { computed } from "vue";
import MainDialog from "./global/MainDialog.vue";
import ComboboxComponent from "./global/ComboboxComponent.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  mode: { type: String, default: "create" },
  product: { type: Object, default: () => ({}) },
  categories: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "update:modelValue",
  "update:productName",
  "update:productCategoryId",
]);

const showDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const localProductName = computed({
  get: () => props.product?.name || "",
  set: (val) => emit("update:productName", val),
});

const localCategory = computed({
  get: () =>
    props.product?.category
      ? props.categories.find((c) => c.id === props.product.categoryId)
      : null,
  set: (val) => emit("update:productCategoryId", val?.id || ""),
});

const currentMode = computed(() => props.mode);

const closeDialog = () => emit("update:modelValue", false);

const label = computed(() =>
  currentMode.value === "create" ? "إضافة" : "تعديل"
);

const saveProduct = () => {
  if (!localProductName.value || !localCategory.value) {
    alert("يرجى تعبئة اسم المنتج واختيار التصنيف");
    return;
  }

  if (currentMode.value === "create") {
    console.log("تمت إضافة المنتج:", {
      name: localProductName.value,
      categoryId: localCategory.value.id,
    });
  } else {
    console.log("تم تعديل المنتج:", {
      name: localProductName.value,
      categoryId: localCategory.value.id,
    });
  }

  closeDialog();
};

const submit = () => saveProduct();
</script>

<template>
  <MainDialog v-model="showDialog" :button-label="label" @submit-data="submit">
    <template #title>
      {{ currentMode === "create" ? "إضافة منتج جديد" : "تعديل المنتج" }}
    </template>

    <template #content>
      <input
        v-model="localProductName"
        type="text"
        placeholder="اسم المنتج"
        class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <ComboboxComponent
        placeholder="اختر اسم التصنيف"
        v-model="localCategory"
        :items="categories"
      />
    </template>
  </MainDialog>
</template>

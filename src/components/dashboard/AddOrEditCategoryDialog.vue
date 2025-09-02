<script setup>
import { computed } from "vue";
import MainDialog from "./global/MainDialog.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "create",
  },
  category: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const showDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const localCategoryName = computed({
  get: () => props.category?.name,
  set: (val) => emit("update:categoryName", val),
});

const currentMode = computed(() => {
  return props.mode;
});

// const mode = ref("create"); // "create" أو "edit"
// const categoryName = ref("");

// إغلاق المودال
const closeDialog = () => {
  emit("update:modelValue", false);
};
const label = computed(() => {
  return currentMode.value === "create" ? "إضافة" : "تعديل";
});
const saveCategory = () => {
  if (currentMode.value === "create") {
    console.log("تمت إضافة:", categoryName.value);
  } else {
    console.log("تم التعديل:", categoryName.value);
  }
  closeDialog();
};

const submit = () => {};
</script>

<template>
  <MainDialog v-model="showDialog" :button-label="label" @submit-data="submit">
    <template #title>
      {{ mode === "create" ? "إضافة تصنيف جديد" : "تعديل التصنيف" }}
    </template>
    <template #content>
      <input
        v-model="localCategoryName"
        type="text"
        placeholder="اسم التصنيف"
        class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </template>
  </MainDialog>
</template>
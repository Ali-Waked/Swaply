<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import SelectListBox from "./SelectListBox.vue";
import { computed, ref } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
import MainLabel from "./MainLabel.vue";

const props = defineProps({
  quantity: { type: String, default: "" },
  contact_method: { type: String, default: "" },
  availability: { type: String, default: "" },
  exchange_preferences: { type: String, default: "" },
  offer_status: { type: String, default: "" },
});

const emits = defineEmits([
  "update:quantity",
  "update:contact_method",
  "update:availability",
  "update:exchange_preferences",
  "update:offer_status",
]);

const contactOptions = [
  { id: 1, name: "واتساب" },
  { id: 2, name: "مكالمات هاتفية" },
  { id: 3, name: "رسائل نصية" },
  { id: 3, name: "عبر التطبيق فقط" },
  { id: 3, name: "واتساب + مكالمة" },
];

const statusOptions = [
  { id: 1, name: "جديد - لم يستعمل" },
  { id: 2, name: "ممتاز - استعمال خفيف" },
  { id: 3, name: "جيد - استعمال عادي" },
  { id: 3, name: "مقبول - يحتاج صيانة بسيطة" },
  { id: 3, name: "طازج - المواد الغذلئية" },
  { id: 3, name: "مغلق - لم يفتح" },
];

const quantityOptions = [
  { id: 1, name: "قطعة واحدة" },
  { id: 2, name: "كمية صغيرة (5 - 2)" },
  { id: 3, name: "كمية متوسطة (10 - 6)" },
  { id: 3, name: "كبية كبيرة (اكثر من 10)" },
  { id: 3, name: "1 كيلو" },
  { id: 3, name: "5 كيلو" },
  { id: 3, name: "10 كيلو" },
  { id: 3, name: "1 لتر" },
  { id: 3, name: "5 لتر" },
  { id: 3, name: "كمية متخصصة (حدد في الوصف)" },
];

const availabilityOptions = [
  { id: 3, name: "متوفر الان" },
  { id: 3, name: "متوفر اليوم" },
  { id: 3, name: "متوفر غذا" },
  { id: 3, name: "متوفر في العطلة نهاية الاسبوع" },
  { id: 3, name: "متوفر صباحا (6ص - 12ظ)" },
  { id: 3, name: "متوفر بعد الظهر (12ظ - 6م)" },
  { id: 3, name: "متوفر مساء (6م - 10م)" },
  { id: 3, name: "مرونة في التوقيت" },
];

const exchangeDetails = [
  { id: 3, name: "تبادل مباشر مفضل" },
  { id: 3, name: "مقابلة في مكان عام" },
  { id: 3, name: "تسليم منزلي ممكن" },
  { id: 3, name: "استلام من المنزل" },
  { id: 3, name: "اللقاء في منتصف المسافة" },
  { id: 3, name: "بالقرب من المسجد" },
  { id: 3, name: "في السوق" },
  { id: 3, name: "مرونة في المكان" },
];

const selectedContact = computed({
  get() {
    return contactOptions.filter((el) => el.name == props.contact_method)[0];
  },
  set(value) {
    emits("update:contact_method", value);
  },
});
const selectedStatus = computed({
  get() {
    return statusOptions.filter((el) => el.name == props.offer_status)[0];
  },
  set(value) {
    emits("update:offer_status", value);
  },
});
const selectedQuantity = computed({
  get() {
    return quantityOptions.filter((el) => el.name == props.quantity)[0];
  },
  set(value) {
    emits("update:quantity", value);
  },
});
const selectedExchange = computed({
  get() {
    return exchangeDetails.filter(
      (el) => el.name == props.exchange_preferences
    )[0];
  },
  set(value) {
    emits("update:exchange_preferences", value);
  },
});
const selectedAvailability = computed({
  get() {
    return availabilityOptions.filter((el) => el.name == props.availability)[0];
  },
  set(value) {
    emits("update:availability", value);
  },
});
</script>

<template>
  <Disclosure>
    <template #default="{ open }">
      <DisclosureButton
        class="w-full px-4 border py-2 text-right border-gray-500 text-[14px] text-gray-500 font-[400] focus:border-gray-500 dark:text-white focus:ring-gray-500 bg-white dark:bg-gray-700 rounded-md flex justify-between items-center"
      >
        <span>إضافة تفاصيل</span>
        <span>
          <ChevronUpIcon
            v-if="open"
            class="w-5 h-5 text-gray-500 dark:text-gray-300"
          />
          <ChevronDownIcon
            v-else
            class="w-5 h-5 text-gray-500 dark:text-gray-300"
          />
        </span>
      </DisclosureButton>
      <DisclosurePanel class="mt-2 space-y-3">
        <!-- Select Contact -->
        <MainLabel label="التواصل" />
        <SelectListBox
          v-model="selectedContact"
          :options="contactOptions"
          class="w-full"
          label="اختر طريقة التوصل"
        />

        <MainLabel label="الحالة" />
        <!-- Select Status -->
        <SelectListBox
          v-model="selectedStatus"
          :options="statusOptions"
          class="w-full"
          label="حالة السلعة المعروضة"
        />

        <MainLabel label="الكمية" />
        <!-- Select Quantity -->
        <SelectListBox
          v-model="selectedQuantity"
          :options="quantityOptions"
          class="w-full"
          label="كمية السلعة المعروضة"
        />
        <MainLabel label="التوفر" />
        <!-- Select Quantity -->
        <SelectListBox
          v-model="selectedAvailability"
          :options="availabilityOptions"
          class="w-full"
          label="متى السلعة متوفرة للتبادل"
        />
        <MainLabel label="تفضيلات التبادل" />
        <!-- Select Quantity -->
        <SelectListBox
          v-model="selectedExchange"
          :options="exchangeDetails"
          class="w-full"
          label="كيف تفضل اتمام التبادل"
        />
      </DisclosurePanel>
    </template>
  </Disclosure>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  activeId: { type: String, required: true },
});

const emit = defineEmits(["update:activeId"]);

const isActive = ref(false);

const handleClick = () => {
  emit("update:activeId", props.id);
  emit("scrollTo", { id: props.id, label: props.label });
};
</script>

<template>
  <li>
    <a
      :href="'#' + id"
      @click.prevent="handleClick"
      :class="[
        'flex items-center gap-3 p-[10px] rounded-lg transition-colors font-[500] text-[16px]',
        activeId === id
          ? 'text-white bg-black'
          : 'text-black hover:bg-gray-100',
      ]"
    >
      <span class="icon">
        <slot name="icon" />
      </span>
      <span>{{ label }}</span>
    </a>
  </li>
</template>

<template>
  <button
    type="button"
    :data-modal-target="props.modalId"
    :data-modal-toggle="props.modalId"
    class="text-gray-900 sm:w-52 w-full bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
  >
    {{ props.buttonText ? props.buttonText : "Open modal" }}
  </button>
</template>

<script setup lang="ts">
type Props = {
  modalId: string;
  buttonText?: string;
};
const props = defineProps<Props>();
</script>

<style scoped></style>

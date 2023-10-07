<template>
  <AppModal :modal-id="`textExportModal`" :modal-title="`Export texts`">
    <template v-slot:modalBody>
      <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Export text in a specified format.
      </p>
      <ul class="my-4 space-y-3">
        <li>
          <button
            class="flex w-full items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            @click="jumpToCsvExport()"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">CSV</span>
          </button>
        </li>
        <li>
          <button
            class="flex w-full items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            @click="jumpToJsonExport()"
          >
            <span class="flex-1 ml-3 whitespace-nowrap">JSON</span>
          </button>
        </li>
      </ul>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "../AppModal.vue";

type Emits = {
  (e: "jumpToJsonExport"): void;
  (e: "jumpToCsvExport"): void;
};
const emit = defineEmits<Emits>();

const jumpToJsonExport = () => {
  emit("jumpToJsonExport");
};

const jumpToCsvExport = () => {
  emit("jumpToCsvExport");
};
</script>

<style scoped></style>

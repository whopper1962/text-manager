<template>
  <div
    :id="props.modalId"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="closeModal()"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <!-- Modal header -->
        <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
          <h3
            class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
          >
            {{ props.modalTitle }}
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6">
          <slot name="modalBody"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalHelper } from "@/helpers/modalHelper";

type Props = {
  modalId: string;
  modalTitle: string;
};

const props = defineProps<Props>();

const { hideModal } = useModalHelper();

const closeModal = () => {
  hideModal(props.modalId);
};
</script>

<style scoped></style>

<template>
  <div>
    <div
      class="w-100 p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        :class="`grid md:grid-cols-${languages.length} md:gap-6`"
        v-for="num in inputedForms"
        :key="num"
      >
        <div
          class="relative z-0 w-full mb-6 group"
          v-for="language in languages"
          :key="language.id"
        >
          <input
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {{ language.name }}
          </label>
        </div>
      </div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="addForm()"
      >
        Add form
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { languagesApiService } from "@/services/LanguagesApiService";
import { Language } from "@/types/languages";
import { ref } from "vue";

const languages = ref<Language[]>([]);
const inputedForms = ref<string[]>([]);

const fetchLanguages = async (): Promise<void> => {
  try {
    languages.value = await languagesApiService.fetchAll();
  } catch {
    throw new Error();
  }
};

const addForm = (): void => {
  inputedForms.value.push("");
};

(() => {
  fetchLanguages();
})();
</script>

<style scoped></style>

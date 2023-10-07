<template>
  <button
    id="dropdownDefaultButton"
    data-dropdown-toggle="dropdown"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    {{ selectedLanguage.name }}
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    id="dropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      <li v-for="language in languages" :key="language.id">
        <a
          @click="changeSelectedLanguage(language)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >{{ language.name }}</a
        >
      </li>
    </ul>
  </div>
  <div class="code-editor-wrapper">
    <Codemirror
      v-model="code[selectedLanguage?.id]"
      :style="{ height: '500px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="4"
      :extensions="extensions"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { initFlowbite } from "flowbite";
import { Language } from "@/types/languages";
import { languagesApiService } from "@/services/LanguagesApiService";

const code = ref<Record<string, string>>({});
const selectedLanguage = ref<Language>({
  id: "",
  name: "",
});
const extensions = [oneDark, json()];
const languages = ref<Language[]>([]);

const fetchLanguages = async (): Promise<void> => {
  try {
    languages.value = await languagesApiService.fetchAll();
    selectedLanguage.value = languages.value[0];
  } catch {
    throw new Error();
  }
};

const changeSelectedLanguage = (language: Language): void => {
  selectedLanguage.value = language;
};

onMounted(() => {
  initFlowbite();
});

(async () => {
  const savedJsonObj = JSON.parse(localStorage.getItem("jsonToExport") || "{}");

  const obj: Record<string, string> = {};

  for (const key in savedJsonObj) {
    obj[key] = JSON.stringify(savedJsonObj[key], null, 4);
  }
  code.value = obj;

  await fetchLanguages();
})();
</script>

<style scoped>
.code-editor-wrapper {
  margin-top: 20px;
}
</style>

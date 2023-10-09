<template>
  <div>
    {{ textId }}

    <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-52 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="onClickBookmark()"
      >
      Bookmark
      </button>
  </div>
</template>

<script setup lang="ts">
import { useToastHelper } from "@/helpers/toastHelper";
import { languagesApiService } from "@/services/LanguagesApiService";
import { textsApiService } from "@/services/TextsApiService";
import { Language } from "@/types/languages";
import { TextDetails } from "@/types/texts";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { showErrorToast } = useToastHelper();

const textId = route.params.textId.toString();

const text = ref<TextDetails>();
const languages = ref<Language[]>([]);

const fetchTextById = async (): Promise<void> => {
  try {
    const fetchedText = await textsApiService.fetchById(textId);
    Object.assign(text, fetchedText);
  } catch {
    throw new Error();
  }
};

const onClickBookmark = async (): Promise<void> => {
  try {
    await textsApiService.postBookmark(textId);
    await fetchTextById();
  } catch {
    showErrorToast();
  }
};

const fetchLanguages = async (): Promise<void> => {
  try {
    languages.value = await languagesApiService.fetchAll();
  } catch {
    throw new Error();
  }
};

(() => {
  Promise.all([fetchTextById(), fetchLanguages()]).catch(() => {
    showErrorToast();
    router.push({
      name: "TextsIndex",
    });
  });
})();
</script>

<style scoped></style>

<template>
  <div>
    {{ textId }}
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
    console.error(text);
  } catch {
    throw new Error();
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

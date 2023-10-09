<template>
  <div>
    <div class="mb-5">
      <h4
        class="text-2xl font-bold dark:text-gray-900 border-b-2 border-gray-900 p-2 mb-5"
      >
        <font-awesome-icon
          v-if="textDetails?.bookmarked"
          class="cursor-pointer mr-1"
          :icon="['fas', 'bookmark']"
          @click="deleteBookmark()"
        />
        <font-awesome-icon
          v-else
          class="cursor-pointer mr-1"
          :icon="['far', 'bookmark']"
          @click="createBookmark()"
        />
        Text information
      </h4>
      <TextInfoTableVue :languages="languages" :text-details="textDetails" />
    </div>
    <div>
      <h4
        class="text-2xl font-bold dark:text-gray-900 border-b-2 border-gray-900 p-2"
      >
        Update history
      </h4>
      <TextUpdateHistoryVue />
    </div>
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
import TextInfoTableVue from "@/components/TextsShow/TextInfoTable.vue";
import TextUpdateHistoryVue from "@/components/TextsShow/TextUpdateHistory.vue";

const route = useRoute();
const router = useRouter();

const { showErrorToast } = useToastHelper();

const textId = route.params.textId.toString();

const textDetails = ref<TextDetails>({
  id: "",
  text: {},
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  updater: {
    id: "",
    name: "",
    email: "",
    profileImage: "",
  },
  memo: "",
  alias: "",
  bookmarked: true,
});
const languages = ref<Language[]>([]);

const fetchTextById = async (): Promise<void> => {
  try {
    const fetchedText = await textsApiService.fetchById(textId);
    textDetails.value = fetchedText;
  } catch {
    throw new Error();
  }
};

const createBookmark = async (): Promise<void> => {
  try {
    await textsApiService.createBookmark(textId);
    await fetchTextById();
  } catch {
    showErrorToast();
  }
};

const deleteBookmark = async (): Promise<void> => {
  try {
    await textsApiService.deleteBookmark(textId);
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

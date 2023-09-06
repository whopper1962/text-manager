<template>
  <div>
    <!-- <div class="card h-25 p-3 mb-4">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">Text</label>
          <input
            type="text"
            class="form-control"
            v-model="inputedSeachQuery.text"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Tags</label>
          <select
            class="form-select"
            aria-label="Default select example"
            role="button"
            v-model="inputedSeachQuery.tagId"
          >
            <option :value="''" selected>All</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">
              {{ tag.name }}
            </option>
          </select>
        </div>
      </div>
      <button class="btn btn-success w-25" @click="fetchTexts()">
        Get Texts
      </button>
    </div> -->

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th
              scope="col"
              class="px-6 py-3"
              v-for="language in languages"
              :key="language.id"
            >
              {{ language.name }}
            </th>
            <th scope="col" class="px-6 py-3">Tags</th>
            <th scope="col" class="px-6 py-3">Created at</th>
            <th scope="col" class="px-6 py-3">Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[75px]"
            v-for="fetchedText in fetchedTexts"
            :key="fetchedText.id"
          >
            <td
              class="px-3 py-2 min-w-max"
              v-for="language in languages"
              :key="language.id"
            >
              {{ fetchedText.text[language.id] }}
            </td>
            <td class="px-3 py-2">
              <button
                class="text-white bg-purple-700 hover:bg-purple-800 min-w-max focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 m-1 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-2"
                v-for="tag in fetchedText.tags"
                :key="tag.id"
                @click="onClickTag(tag.id)"
              >
                {{ tag.name }}
              </button>
            </td>
            <td class="px-3 py-2">
              {{ formatDateToYyyyMmDdHhMmSs(fetchedText.createdAt) }}
            </td>
            <td class="px-3 py-2">
              {{ formatDateToYyyyMmDdHhMmSs(fetchedText.updatedAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IndexSearchQuery, Text } from "@/types/texts";
import type { Language } from "@/types/languages";
import { textsApiService } from "@/services/TextsApiService";
import { languagesApiService } from "@/services/LanguagesApiService";
import { tagsApiService } from "@/services/TagsApiService";
import { useFormatHelper } from "@/helpers/formatHelper";
import { reactive, ref } from "vue";
import { Tag } from "@/types/tags";

const fetchedTexts = ref<Text[]>([]);
const languages = ref<Language[]>([]);
const tags = ref<Tag[]>([]);

const inputedSeachQuery = reactive<IndexSearchQuery>({
  text: "",
  tagId: "",
});

const { formatDateToYyyyMmDdHhMmSs } = useFormatHelper();

const fetchTexts = async (): Promise<void> => {
  try {
    fetchedTexts.value = await textsApiService.fetchAll();
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

const fetchTags = async (): Promise<void> => {
  try {
    tags.value = await tagsApiService.fetchAll();
  } catch {
    throw new Error();
  }
};

const onClickTag = (tagId: string): void => {
  console.log("=============CLICKED TAG==============");
  console.debug(tagId);
  inputedSeachQuery.tagId = tagId;
};

(() => {
  Promise.all([fetchTexts(), fetchLanguages(), fetchTags()]).catch(() => {
    alert("Error occured while fetching data!");
  });
})();
</script>

<style scoped></style>

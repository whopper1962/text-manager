<template>
  <div>
    <div
      class="w-100 p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="z-auto w-full mb-6 group">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Search text</label
          >
          <div class="flex">
            <button
              id="dropdown-button"
              data-dropdown-toggle="language-dropdown"
              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              {{ getLanguageNameById(inputedSeachQuery.languageId) }}
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
            <button
              id="dropdown-button"
              data-dropdown-toggle="comparison-method-dropdown"
              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              {{ inputedSeachQuery.comparisonMethod }}
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
            <div
              id="language-dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 z-50 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li v-for="language in languages" :key="language.id">
                  <button
                    type="button"
                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="onClickLanguageDropdown(language.id)"
                  >
                    {{ language.name }}
                  </button>
                </li>
              </ul>
            </div>
            <div
              id="comparison-method-dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 z-50 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li
                  v-for="(method, index) in ComparisonMethod"
                  :key="`method_${index}`"
                >
                  <button
                    type="button"
                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="onClickComparisonMethodDropdown(method)"
                  >
                    {{ method }}
                  </button>
                </li>
              </ul>
            </div>
            <div class="relative w-full">
              <input
                type="text"
                id="search-dropdown"
                autocomplete="off"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Input text search keyword...."
                v-model="inputedSeachQuery.keyword"
              />
            </div>
          </div>
        </div>
        <div class="z-auto mb-6 group">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tag</label
          >

          <button
            id="dropdownCheckboxButton"
            data-dropdown-toggle="dropdownDefaultCheckbox"
            class="w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-gray-900 bg-gray-100 border border-gray-300 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 hover:bg-gray-200"
            type="button"
          >
            <template v-if="inputedSeachQuery.tagIds.length === 0">
              Select tags
            </template>
            <template v-else>
              <span
                class="mr-2"
                v-for="(tagId, index) in inputedSeachQuery.tagIds"
                :key="tagId"
              >
                {{ getTagNameById(tagId)
                }}<span v-if="index !== inputedSeachQuery.tagIds.length - 1">
                  ,</span
                >
              </span>
            </template>
          </button>

          <div
            id="dropdownDefaultCheckbox"
            class="z-10 hidden w-2/5 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownCheckboxButton"
            >
              <li v-for="tag in tags" :key="tag.id">
                <div class="flex items-center">
                  <input
                    :id="`checkbox-item-${tag.id}`"
                    type="checkbox"
                    :value="tag.id"
                    v-model="inputedSeachQuery.tagIds"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    :for="`checkbox-item-${tag.id}`"
                    class="ml-2 w-full cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
                    >{{ tag.name }}</label
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickSearchButton()"
      >
        Search
      </button>
      <button
        type="button"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:ml-3 mt-3 md:mt-0"
        @click="onClickClearButton()"
      >
        Clear
      </button>
    </div>

    <div class="z-0 overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="checkBoxForEntireAllTexts"
                  @change="onChangeCheckboxForAll()"
                />
              </div>
            </th>
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
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[70px]"
            v-for="fetchedText in fetchedTexts"
            :key="fetchedText.id"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  :id="`checkbox-table-search-${fetchedText.id}`"
                  type="checkbox"
                  class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="textMasterCheckBoxes[fetchedText.id]"
                />
              </div>
            </td>
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
    <AppPagniation />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { TextsIndexSearchQuery, Text } from "@/types/texts";
import { ComparisonMethod } from "@/types/texts";
import type { Language } from "@/types/languages";
import { textsApiService } from "@/services/TextsApiService";
import { languagesApiService } from "@/services/LanguagesApiService";
import { tagsApiService } from "@/services/TagsApiService";
import { useFormatHelper } from "@/helpers/formatHelper";
import { Tag } from "@/types/tags";
import AppPagniation from "@/components/AppPagniation.vue";
import { useRoute, useRouter } from "vue-router";
import { initFlowbite } from "flowbite";
import { useToastHelper } from "@/helpers/toastHelper";

const fetchedTexts = ref<Text[]>([]);
const languages = ref<Language[]>([]);
const tags = ref<Tag[]>([]);
const textMasterCheckBoxes = reactive<Record<string, boolean>>({});
const checkBoxForEntireAllTexts = ref<boolean>(false);

const initialSearchQuery = {
  keyword: "",
  tagIds: [],
  languageId: "",
  comparisonMethod: ComparisonMethod.CONTAINS,
};

const inputedSeachQuery = reactive<TextsIndexSearchQuery>({
  ...initialSearchQuery,
});

const { formatDateToYyyyMmDdHhMmSs } = useFormatHelper();
const { showErrorToast } = useToastHelper();
const router = useRouter();
const route = useRoute();

const onClickSearchButton = async (): Promise<void> => {
  try {
    await fetchTexts();
  } catch {
    showErrorToast();
  }
};

const fetchTexts = async (): Promise<void> => {
  try {
    const trimedInputedSeachQuery = trimInputedSeachQuery(inputedSeachQuery);
    fetchedTexts.value = await textsApiService.fetchAll(
      trimedInputedSeachQuery,
    );
    initializeCheckbox();
    router.replace({ query: trimedInputedSeachQuery });
  } catch {
    throw new Error();
  }
};

const initializeCheckbox = (): void => {
  fetchedTexts.value.forEach((text) => {
    textMasterCheckBoxes[text.id] = false;
  });
  checkBoxForEntireAllTexts.value = false;
};

const onChangeCheckboxForAll = (): void => {
  Object.keys(textMasterCheckBoxes).forEach((textMasterId) => {
    textMasterCheckBoxes[textMasterId] = checkBoxForEntireAllTexts.value;
  });
};

const onClickLanguageDropdown = (languageId: string): void => {
  inputedSeachQuery.languageId = languageId;
};

const onClickComparisonMethodDropdown = (
  selectedComparisonMethod: ComparisonMethod,
) => {
  inputedSeachQuery.comparisonMethod = selectedComparisonMethod;
};

const getLanguageNameById = (languageId: string): string => {
  return (
    languages.value.find((language) => language.id === languageId)?.name || ""
  );
};

const getTagNameById = (tagId: string): string => {
  return tags.value.find((tag) => tag.id === tagId)?.name || "";
};

const trimInputedSeachQuery = (
  inputedSeachQueryToTrim: TextsIndexSearchQuery,
): Partial<TextsIndexSearchQuery> => {
  return Object.fromEntries(
    Object.entries(inputedSeachQueryToTrim).filter(([key, value]) => {
      if (key === "tagIds" && value.length > 0) return true;
      if (key === "languageId" || key === "comparisonMethod")
        return inputedSeachQueryToTrim.keyword;
      return value !== "";
    }),
  );
};

const onClickClearButton = (): void => {
  // Clear search query
  Object.assign(inputedSeachQuery, initialSearchQuery);
  inputedSeachQuery.languageId = languages.value[0].id;
};

const setInitialSearchQuery = (): void => {
  Object.keys(route.query).forEach((queryKey: string): void => {
    if (queryKey === "tagIds" && typeof route.query[queryKey] === "string") {
      inputedSeachQuery[queryKey as keyof TextsIndexSearchQuery] = [
        route.query[queryKey],
      ] as any;
    } else {
      inputedSeachQuery[queryKey as keyof TextsIndexSearchQuery] = route.query[
        queryKey
      ] as any;
    }
  });
  inputedSeachQuery.languageId = languages.value[0]?.id;
};

const initialTextSearch = async (): Promise<void> => {
  try {
    setInitialSearchQuery();
    await fetchTexts();
  } catch {
    throw new Error();
  }
};

const fetchLanguages = async (): Promise<void> => {
  try {
    languages.value = await languagesApiService.fetchAll();
    if (inputedSeachQuery.languageId) return;
    inputedSeachQuery.languageId = languages.value[0].id || "";
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
  console.debug("Clicked:", tagId);
  // router.push({
  //   name: "TagsShow",
  //   params: {
  //     id: tagId,
  //   },
  // });
};

onMounted(() => {
  initFlowbite();
});

(() => {
  Promise.all([initialTextSearch(), fetchLanguages(), fetchTags()]).catch(
    () => {
      showErrorToast();
    },
  );
})();
</script>

<style scoped></style>

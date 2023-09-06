<template>
  <div>
    <h2 class="border-bottom pb-3 mb-3">Texts</h2>
    <div class="card h-25 p-3 mb-4">
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
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th v-for="language in languages" :key="language.id">
            {{ language.name }}
          </th>
          <th>Tags</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fetchedText in fetchedTexts" :key="fetchedText.id">
          <td v-for="language in languages" :key="language.id">
            {{ fetchedText.text[language.id] }}
          </td>
          <td>
            <button
              class="btn btn-sm btn-secondary m-1"
              v-for="tag in fetchedText.tags"
              :key="tag.id"
              @click="onClickTag(tag.id)"
            >
              {{ tag.name }}
            </button>
          </td>
          <td>{{ formatDateToYyyyMmDdHhMmSs(fetchedText.createdAt) }}</td>
          <td>{{ formatDateToYyyyMmDdHhMmSs(fetchedText.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>
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

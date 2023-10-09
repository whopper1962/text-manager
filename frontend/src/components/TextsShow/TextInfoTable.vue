<template>
  <div class="relative overflow-scroll rounded-lg" v-if="textDetails">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="language in props.languages"
          :key="language.id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            {{ language.name }}
          </th>
          <td class="px-6 py-4">
            {{ props.textDetails.text[language.id] }}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            Tags
          </th>
          <td class="px-3 py-3">
            <button
              class="text-white bg-purple-700 hover:bg-purple-800 min-w-max focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2 m-1 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-2"
              v-for="tag in props.textDetails.tags"
              :key="tag.id"
            >
              {{ tag.name }}
            </button>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            Alias
          </th>
          <td class="px-6 py-4">{{ props.textDetails.alias }}</td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            Created at
          </th>
          <td class="px-6 py-4">
            {{ formatDateToYyyyMmDdHhMmSs(props.textDetails.createdAt) }} by
            {{ props.textDetails.updater.name }}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            Updated at
          </th>
          <td class="px-6 py-4">
            {{ formatDateToYyyyMmDdHhMmSs(props.textDetails.updatedAt) }} by
            {{ props.textDetails.updater.name }}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400"
          >
            Memo
          </th>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ props.textDetails.memo }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFormatHelper } from "@/helpers/formatHelper";
import { Language } from "@/types/languages";
import { TextDetails } from "@/types/texts";

type Props = {
  languages: Language[];
  textDetails: TextDetails;
};
const props = defineProps<Props>();

const { formatDateToYyyyMmDdHhMmSs } = useFormatHelper();
</script>

<style scoped></style>

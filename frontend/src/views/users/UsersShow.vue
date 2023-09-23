<template>
  <div>
    {{ userId }}
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
console.error(router);

const userId = route.params.userId.toString();
console.log(userId);
</script>

<style scoped></style>

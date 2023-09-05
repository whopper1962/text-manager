<template>
  <div>
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  message: string;
};
const props = defineProps<Props>();
</script>

<style scoped></style>

<template>
  <div>
    <NavigationBar />
    <div class="p-5 bg-gray-500 h-screen">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
</script>

<style scoped></style>

<template>
  <div>
    <NavigationBar />
    <div class="p-5 bg-gray-600 min-h-screen">
      <router-view></router-view>
    </div>
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<style scoped></style>

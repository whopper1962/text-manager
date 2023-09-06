<template>
  <div>
    <NavigationBar/>
    <div class="router-view-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
</script>

<style scoped>
.router-view-content {
  padding: 20px;
  /* background-color: rgb(173, 172, 172); */
  /* height: 100vh; */
}
</style>

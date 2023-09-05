<template>
  <div>
    <SomeComponent :message="'Hello World!'" />
    <button @click="fetchUsers()">Fetch Users</button>
    <div>
      {{ users }}
    </div>
  </div>
</template>

<script setup lang="ts">
import SomeComponent from "@/components/SomeComponent.vue";
import type { User } from "@/types/users";
import { usersApiService } from "@/services/UsersApiService";
import { ref } from "vue";

const users = ref<User[]>();

const fetchUsers = async (): Promise<void> => {
  try {
    users.value = await usersApiService.fetchAll();
  } catch {
    alert("Error occured while fetching users!");
  }
};
</script>

<style scoped></style>

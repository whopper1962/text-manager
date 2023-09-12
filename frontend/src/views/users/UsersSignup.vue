<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <form @submit.prevent class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create an account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div
              class="flex flex-col space-y-4 items-center justify-center pt-4"
            >
              <img
                class="rounded-full w-28"
                src="default_icon2.svg"
                alt="image description"
              />
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="inputedUserInfo.name"
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Nickname</label
              >
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="inputedUserInfo.email"
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Email address</label
              >
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="password"
                autocomplete="off"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="inputedUserInfo.password"
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Password</label
              >
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="password"
                autocomplete="off"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="passwordConfirmation"
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Password Confirmation</label
              >
            </div>
            <button
              type="button"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="onClickSignupButton()"
            >
              Sign up!
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link
                :to="{
                  name: 'UsersLogin',
                }"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Login here</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useToastHelper } from "@/helpers/toastHelper";
import { authsApiServiceService } from "@/services/AuthsApiService";
import { SignupPayload } from "@/types/auths";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const { showErrorToast, showSuccessToast } = useToastHelper();
const router = useRouter();

const inputedUserInfo = reactive<SignupPayload>({
  name: "",
  email: "",
  password: "",
});

const passwordConfirmation = ref<string>("");

const onClickSignupButton = async (): Promise<void> => {
  try {
    await authsApiServiceService.signup(inputedUserInfo);
    showSuccessToast(
      `Your account has been successfully created. Welcome, ${inputedUserInfo.name}!`,
    );
    router.push({
      name: "TextsIndex",
    });
  } catch {
    showErrorToast();
  }
};
</script>

<style scoped></style>

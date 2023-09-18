import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/texts",
    name: "TextsIndex",
    component: () => import("@/views/texts/TextsIndex.vue"),
  },
  {
    path: "/texts/register",
    name: "TextsRegister",
    component: () => import("@/views/texts/TextsRegister.vue"),
  },
  {
    path: "/login",
    name: "UsersLogin",
    component: () => import("@/views/users/UsersLogin.vue"),
  },
  {
    path: "/signup",
    name: "UsersSignup",
    component: () => import("@/views/users/UsersSignup.vue"),
  },
  {
    path: "/account-settings",
    name: "AccountSettings",
    component: () => import("@/views/account/AccountSettings.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "TextsIndex",
    },
  },
];

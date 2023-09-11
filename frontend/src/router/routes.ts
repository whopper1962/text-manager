import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/texts",
    name: "TextsIndex",
    component: () => import("@/views/texts/TextsIndex.vue"),
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
    path: "/:catchAll(.*)",
    redirect: {
      name: "TextsIndex",
    },
  },
];

import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "HomeView",
    },
  },
];

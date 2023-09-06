import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/texts",
    name: "TextsIndex",
    component: () => import("@/views/texts/TextsIndex.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "TextsIndex",
    },
  },
];

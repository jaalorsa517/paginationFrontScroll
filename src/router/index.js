import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/:id",
        name: "Detail",
        component: () => import("@/views/Detail.vue"),
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

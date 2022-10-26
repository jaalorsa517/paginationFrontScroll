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
        name: "Details",
        component: () => import("@/views/Details.vue"),
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition;
  },
});

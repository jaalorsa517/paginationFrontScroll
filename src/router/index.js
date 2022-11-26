import { useRoot } from "@/store/useRoot.store";
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
    const storeRoot = useRoot();
    if (to.name === "Home") return { top: storeRoot.scrollY };
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

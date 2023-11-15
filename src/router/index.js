import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   component: () => import("layouts/MainLayout.vue"),
    //   children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    // },
    {
      path: "/",
      component: () => import("pages/IndexPage.vue"),
      // component: () => import("layouts/MainLayout.vue"),
      // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    },
    {
      path: "/plan",
      component: () => import("pages/PlanPage.vue"),
      // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    },

    {
      path: "/temp",
      component: () => import("pages/tmpPage.vue"),
    },
    {
      path: "/login",
      component: () => import("components/user/LoginComponent.vue"),
    },
    {
      path: "/map",
      component: () => import("layouts/MapLayout.vue"),
    },
    {
      path: "/test",
      component: () => import("pages/MapPage.vue"),
    },
  ],
});

export default router;

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
      name: "main",
      component: () => import("pages/IndexPage.vue"),
      // component: () => import("layouts/MainLayout.vue"),
      // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import("pages/PlanPage.vue"),
      // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    },

    {
      path: "/route",
      name: "route",
      component: () => import("pages/MapRoutePage.vue"),
    },

    {
      path: "/mypage",
      name: "user-mypage",
      component: () => import("pages/UserInfoPage.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("layouts/MapLayout.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("layouts/HistoryLayout.vue"),
    },
    {
      path: "/:error",
      name: "error",
      component: () => import("pages/ErrorNotFound.vue"),
    },
  ],
});

export default router;

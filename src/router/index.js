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
      path: "/route",
      component: () => import("pages/MapRoutePage.vue"),
    },
    {
      path: "/login",
      component: () => import("pages/LoginPage.vue"),
    },
    {
      path: "/signin",
      component: () => import("pages/SigninPage.vue"),
    },
    {
      path: "/mypage",
      component: () => import("pages/UserInfoPage.vue"),
    },
    {
      path: "/map",
      component: () => import("layouts/MapLayout.vue"),
    },
    {
      path: "/test",
      component: () => import("layouts/HistoryLayout.vue"),
    },
  ],
});

export default router;

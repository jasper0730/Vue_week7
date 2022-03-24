import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/",
    component: () =>
      import("../views/IndexView.vue"),
    children: [
      {
        path: "products",
        component: () =>
          import("../views/ProductsView.vue"),
      },
      {
        path: "cart",
        component: () =>
          import("../views/CartView.vue"),
      },
      {
        path: "blog",
        component: () =>
          import("../views/BlogView.vue"),
      },
      {
        path: "article/:articleId",
        component: () =>
          import("../views/ArticleView.vue"),
      },
    ]
  },
  {
    path: "/login",
    component: () =>
      import("../views/LoginView.vue"),

  },
  {
    path: "/admin",
    component: () =>
      import("../views/DashboardView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/AdminProducts.vue")
      },
      {
        path: "orders",
        component: () => import("../views/AdminOrders.vue")
      },
      {
        path: "coupons",
        component: () => import("../views/AdminCoupons.vue")
      },
      {
        path: "articles",
        component: () => import("../views/AdminArticles.vue")
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

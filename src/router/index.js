import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/fenlei",
    name: "Fenlei",
    component: () => import("../views/Fenlei.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine.vue"),
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

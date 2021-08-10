import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
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
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

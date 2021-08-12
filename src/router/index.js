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
    meta: { requiresAuth: true, isShow: true },
  },
  {
    path: "/fenlei",
    name: "Fenlei",
    component: () => import("../views/Fenlei.vue"),
    meta: { requiresAuth: false, isShow: true },
  },

  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { requiresAuth: false, isShow: true },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: { requiresAuth: false, isShow: true },
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine.vue"),
    meta: { requiresAuth: false, isShow: true },
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
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/address",
    name: "Address",
    component: () => import("../views/Address.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/addAddress",
    name: "addAddress",
    component: () => import("../views/Addaddress.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/editAddress",
    name: "editAddress",
    component: () => import("../views/Editaddress.vue"),
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/fenlei",
    name: "Fenlei",
    component: () => import("../views/Fenlei.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  { path: "/mine", name: "Mine", component: () => import("../views/Mine.vue") },
];

const router = new VueRouter({
  routes,
});

export default router;

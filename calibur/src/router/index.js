import Vue from "vue";
import VueRouter from "vue-router";
import Directory from "../views/Directory.vue";
import College from "../views/College.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "directory",
    component: Directory,
  },
  {
    path: "/college/:id",
    name: "college",
    component: College,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

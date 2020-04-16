import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login", //家长登录
    name: "login",
    component: resolve => require(["../views/login/Login.vue"], resolve)
  },
  {
    path: "/index", //首页
    name: "index",
    component: resolve => require(["../views/index/Index.vue"], resolve)
  },
  {
    path: "/addChild", //新增子女
    name: "addChild",
    component: resolve => require(["../views/add-child/AddChild.vue"], resolve)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

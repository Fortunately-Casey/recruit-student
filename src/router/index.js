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
    meta: {
      requireAuth: false
    },
    component: resolve => require(["../views/login/Login.vue"], resolve)
  },
  {
    path: "/index", //首页
    name: "index",
    meta: {
      requireAuth: true
    },
    component: resolve => require(["../views/index/Index.vue"], resolve)
  },
  {
    path: "/addChild", //新增子女
    name: "addChild",
    meta: {
      requireAuth: true
    },
    component: resolve => require(["../views/add-child/AddChild.vue"], resolve)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("token");
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (token) {
      // 通过localStorage state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/login"
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;

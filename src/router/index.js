import Vue from "vue";
import VueRouter from "vue-router";
import comment from "../pages/comment/comment";
import seller from "../pages/seller/seller";
import goods from "../pages/goods/goods";
Vue.use(VueRouter);

const routes = [
  //   {
  //     path: "/",
  //     redirect: {
  //       name: "goods"
  //     }
  //   },
  {
    path: "/",
    component: goods
  },
  {
    path: "/comment",
    name: "comment",
    component: comment
  },
  {
    path: "/seller",
    name: "seller",
    component: seller
  },
  {
    path: "/goods",
    name: "goods",
    component: goods
  }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  //   指定点击后的样式名
  base: process.env.BASE_URL,
  routes
});
export default router;

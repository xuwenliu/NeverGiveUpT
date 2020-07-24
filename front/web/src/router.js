import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "index",
      },
    },
    {
      path: "/index",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "index" */ "./views/index/Index.vue"),
    },
  ],
});

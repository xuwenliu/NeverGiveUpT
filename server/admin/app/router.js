"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter; // /api/v1
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin); // 管理员登录
  router.resources("categories", baseRouter + "/categories", jwt, controller.categories); // 分类
  router.resources("tags", baseRouter + "/tags", jwt, controller.tags); // 标签
};

"use strict";

const Controller = require("egg").Controller;

// 定义创建接口的请求参数规则
const createRule = {
  userName: {
    type: "string",
    require: true,
    allowEmpty: false,
    format: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
    min: 5,
    max: 20,
  },
  password: {
    type: "password",
    require: true,
    allowEmpty: false,
    format: /^[A-Za-z0-9_]{6,20}$/,
    min: 6,
    max: 20,
  },
};

class AdminController extends Controller {
  async adminLogin() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(createRule, data);
    const res = await ctx.service.admin.adminLogin(data);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = AdminController;

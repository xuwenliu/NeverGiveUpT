const Controller = require("egg").Controller;
const coWeChat = require("co-wechat");
const config = require("../../config/config.user");
class AuthController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    await service.auth.index(data);
  }
  async signature() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.signature(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async replay() {
    const { ctx, service } = this;
    const res = await service.auth.replay();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async createMenu() {
    const { ctx, service } = this;
    const res = await service.auth.createMenu();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async removeMenu() {
    const { ctx, service } = this;
    const res = await service.auth.removeMenu();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}
// 使用co-wechat来回复消息
AuthController.prototype.weChat = coWeChat({
  token: config.token,
  appid: config.appId,
  encodingAESKey: "",
}).middleware(async (message, ctx) => {
  return await ctx.service.auth.replay(message);
});
module.exports = AuthController;

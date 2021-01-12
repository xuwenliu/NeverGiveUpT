const Controller = require("egg").Controller;

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
}

module.exports = AuthController;

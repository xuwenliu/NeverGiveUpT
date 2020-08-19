const Controller = require("egg").Controller;

class LikeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async submit() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.like.submit(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = LikeController;

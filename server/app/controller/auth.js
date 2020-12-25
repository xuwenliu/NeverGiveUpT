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
}

module.exports = AuthController;

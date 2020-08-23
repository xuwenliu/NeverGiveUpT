const Controller = require("egg").Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      email: {
        type: "string",
        format: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      password: {
        type: "password",
        format: /^[a-zA-Z]\w{5,19}$/,
      },
      nickName: {
        type: "string",
        required: false,
        max: 20,
      },
      introduction: {
        type: "string",
        required: false,
        max: 1000,
      },
    };
  }
  async register() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.web.user.register(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async login() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.user.login(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async logout() {
    const { ctx, service } = this;
    const res = await service.web.user.logout();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = UserController;

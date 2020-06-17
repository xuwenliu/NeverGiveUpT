const Controller = require("egg").Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 10,
      },
      nickName: {
        type: "string",
        required: false,
        max: 20,
      }
    }
  }
  async index() {

    const {
      ctx
    } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await ctx.service.user.index(data);
    ctx.helper.success({
      ctx,
      res
    });
  }

  async destroy() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.params;
    const res = await ctx.service.user.destroy(id);
    ctx.helper.success({
      ctx,
      res
    });
  }
}

module.exports = UserController;
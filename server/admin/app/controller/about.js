const Controller = require("egg").Controller;

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      imgs: {
        type: "array",
        itemType: "object",
        min: 1,
        max: 3,
        rule: {
          imgUrl: "url",
          link: {
            type: "string",
            required: false,
          },
        },
      },
      desc: {
        type: "string",
        min: 1,
        max: 5000,
      },
      tags: {
        type: "array",
        itemType: "string",
        min: 1,
        max: 20,
      },
      showResume: {
        type: "boolean",
        default: false,
      },
    };
  }
  async index() {
    const { ctx } = this;
    const res = await ctx.service.about.index();
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await ctx.service.about.create(data);
    ctx.helper.success({ ctx, res });
  }
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await ctx.service.about.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }
}

module.exports = AboutController;

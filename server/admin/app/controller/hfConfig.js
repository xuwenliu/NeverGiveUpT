const Controller = require("egg").Controller;

class HfConfigController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      header: {
        type: "object",
        rule: {
          logo: {
            type: "string",
            required: false,
          },
          title: {
            type: "string",
            required: false,
          },
          fixedHeader: {
            type: "boolean",
            default: true,
          },
          openSearch: {
            type: "boolean",
            default: true,
          },
          login: {
            type: "boolean",
            default: false,
          },
          register: {
            type: "boolean",
            default: false,
          },
          menu: {
            type: "array",
            itemType: "object",
            min: 6,
            max: 10,
            rule: {
              name: {
                type: "string",
                min: 2,
                max: 4,
              },
              router: {
                type: "string",
                match: /^[a-z]{1,50}$/,
                min: 1,
                max: 50,
              },
              sort: {
                type: "number",
                max: 9999,
                default: 0,
              },
              status: {
                type: "boolean",
                default: true,
              },
            },
          },
        },
      },
      footer: {
        type: "object",
        rule: {
          copyright: {
            type: "string",
            min: 1,
            max: 200,
          },
          extra: {
            type: "string",
            min: 1,
            max: 200,
          },
        },
      },
    };
  }
  async index() {
    const { ctx } = this;
    const res = await ctx.service.hfConfig.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await ctx.service.hfConfig.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await ctx.service.hfConfig.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = HfConfigController;

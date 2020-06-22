const Controller = require("egg").Controller;

class RightIntroductionController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createIntroductionRule = {
      nickName: {
        type: "string",
        min: 2,
        max: 20,
      },
      desc: {
        type: "string",
        min: 2,
        max: 500,
      },
      tags: {
        type: "array",
        itemType: "object",
        min: 1,
        max: 10,
        rule: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
            min: 2,
            max: 20,
            format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
          },
        },
      },
      frendLink: {
        type: "array",
        itemType: "object",
        rule: {
          url: {
            type: "string",
          },
          icon: {
            type: "string",
          },
        },
        min: 1,
        max: 4,
      },
      showPosition: {
        type: "array",
        itemType: "object",
        rule: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
        min: 1,
        max: 10,
      },
      createTime: {
        type: "number",
        required: false,
        default: 0,
      },
      updateTime: {
        type: "number",
        required: false,
        default: 0,
      },
    };
  }
  async index() {
    const { ctx, service } = this;
    const res = await service.config.right.introduction.index();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createIntroductionRule, data);
    const res = await service.config.right.introduction.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createIntroductionRule, data);
    const res = await service.config.right.introduction.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RightIntroductionController;

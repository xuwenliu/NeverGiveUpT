const Controller = require("egg").Controller;

class ArticlesController extends Controller {
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
      title: {
        type: "string",
        required: false,
        min: 2,
        max: 200,
        allowEmpty: true,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,200}$/,
      },
      categories: {
        type: "string",
        required: false,
        default: "",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      tags: {
        // vue,react,
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        required: false,
        default: "",
      },
      publishStatus: {
        type: "string",
        required: false,
        default: "",
      },
      createStartTime: {
        type: "number",
        required: false,
        default: 0,
      },
      createEndTime: {
        type: "number",
        required: false,
        default: 0,
      },
      updateStartTime: {
        type: "number",
        required: false,
        default: 0,
      },
      updateEndTime: {
        type: "number",
        required: false,
        default: 0,
      },
    };

    this.createRule = {
      title: {
        type: "string",
        min: 2,
        max: 200,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,200}$/,
      },
      cover: {
        type: "url",
      },
      introduction: {
        type: "string",
        min: 10,
        max: 500,
      },
      categories: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      tags: {
        type: "array",
        itemType: "string",
      },
      content: {
        type: "string",
      },
      views: {
        type: "number",
        default: 1,
      },
      like: {
        type: "number",
        default: 1,
      },
      collect: {
        type: "number",
        default: 1,
      },
      isComment: {
        type: "boolean",
        default: true,
      },
      isLike: {
        type: "boolean",
        default: true,
      },
      isCollect: {
        type: "boolean",
        default: true,
      },
      // 是否开启打赏
      isReward: {
        type: "boolean",
        default: false,
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
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.articles.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.articles.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.articles.destroy(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.articles.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ArticlesController;

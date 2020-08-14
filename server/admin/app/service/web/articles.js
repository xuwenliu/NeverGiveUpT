const Service = require("egg").Service;

class ArticlesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 文章列表
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    const queryCon = {
      status: 1,
      publishStatus: 1,
    };
    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
    let list = await ctx.model.Articles.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: {
        page,
        pageSize,
        totalCount,
        list,
      },
      msg: "文章列表获取成功",
    };
  }

  async details(params) {
    const { ctx } = this;
    const id = params.id; // 文章id
    const res = await ctx.model.Articles.findOne({
      _id: id,
    });
    return {
      data: res,
      msg: "文章详情获取成功",
    };
  }
}

module.exports = ArticlesService;

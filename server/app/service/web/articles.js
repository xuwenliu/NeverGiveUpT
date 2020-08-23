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
    const { id, views } = params; // 文章id
    if (views * 1 === 1) {
      // 第一次查看该文章
      const oldView = await ctx.model.Articles.findOne({
        _id: id,
      });
      await ctx.model.Articles.updateOne(
        {
          _id: id,
        },
        {
          views: oldView.views + 1,
        }
      );
    }
    const queryCon = {
      status: 1,
      publishStatus: 1,
    };
    const allArticles = await ctx.model.Articles.find(queryCon).sort({
      createTime: -1,
    });
    const index = allArticles.findIndex((item) => item._id == id);
    
    let prev = null;
    let next = null;
    if (index === 0) {
      // 没有上一篇文章
      prev = null;
      next = allArticles[index + 1];
    } else if (index === allArticles.length - 1) {
      // 没有下一篇文章
      prev = allArticles[index - 1];
      next = null;
    } else {
      prev = allArticles[index - 1];
      next = allArticles[index + 1];
    }

    const data = {
      prev,
      next,
      current: allArticles[index],
    };

    return {
      data,
      msg: "文章详情获取成功",
    };
  }
}

module.exports = ArticlesService;

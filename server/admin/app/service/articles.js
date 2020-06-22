const Service = require("egg").Service;

class ArticlesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1 || app.config.PAGE;
    const pageSize = params.pageSize * 1 || app.config.PAGE_SIZE;
    const totalCount = await ctx.model.Articles.find({}).countDocuments();
    delete params.page;
    delete params.pageSize;
    const queryCon = ctx.helper.filterEmptyField(params);

    const data = await ctx.model.Articles.find({
      ...queryCon,
      title: { $regex: params.title ? params.title : "" },
    })
      .sort({ sort: -1 })
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
      msg: "文章列表获取成功",
    };
  }

  async create(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({
      title: params.title,
    });
    if (oldArticles) {
      return {
        msg: "该文章已存在",
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Articles.create(data);
    return {
      msg: "文章添加成功",
      data: res,
    };
  }

  // 删除文章
  async destroy(id) {
    const { ctx } = this;

    const oldArticles = await ctx.model.Articles.findOne({
      _id: id,
    });
    if (!oldArticles) {
      return {
        msg: "文章不存在",
      };
    }

    await ctx.model.Articles.deleteOne({
      _id: id,
    });
    return {
      msg: "文章删除成功",
    };
  }

  // 修改文章
  async update(params) {
    const { ctx } = this;

    const oldIdArticles = await ctx.model.Articles.findOne({
      _id: params.id,
    });

    if (oldIdArticles) {
      // 这里查询是因为可以修改不同id的数据为相同的title，需要通过title判断是否已经存在相同的name
      const oldNameArticles = await ctx.model.Articles.findOne({
        title: params.title,
      });
      if (oldNameArticles) {
        return {
          msg: "文章已存在，请重新修改",
        };
      }
    } else {
      return {
        msg: "文章不存在",
      };
    }

    const updateData = {
      ...params,
      createTime: oldIdArticles.createTime,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "文章修改成功",
    };
  }
}

module.exports = ArticlesService;

const Service = require("egg").Service;

class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 评论列表
  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1 || app.config.PAGE;
    const pageSize = params.pageSize * 1 || app.config.PAGE_SIZE;
    const totalCount = await ctx.model.Comment.find({}).countDocuments();
    delete params.page;
    delete params.pageSize;

    let mustCon = {};
    if (params.auditStatus !== "0") {
      mustCon = {
        auditStatus: params.auditStatus,
      };
    }
    // auditStatus === "0" -查全部
    // nickName 模糊匹配
    // articleTitle  模糊匹配
    // 三者是and关系
    const queryCon = {
      $and: [
        mustCon,
        {
          $or: [
            {
              nickName: { $regex: params.nickName ? params.nickName : "" },
            },
          ],
        },
        {
          $or: [
            {
              articleTitle: {
                $regex: params.articleTitle ? params.articleTitle : "",
              },
            },
          ],
        },
      ],
    };

    const data = await ctx.model.Comment.find(queryCon)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    console.log(data);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
      msg: "评论列表获取成功",
    };
  }

  async destroy(id) {
    const { ctx } = this;

    const oldComment = await ctx.model.Comment.findOne({
      _id: id,
    });
    if (!oldComment) {
      return {
        msg: "评论不存在",
      };
    }

    await ctx.model.Comment.deleteOne({
      _id: id,
    });
    return {
      msg: "评论删除成功",
    };
  }

  async update(params) {
    const { ctx } = this;

    const oldIdComment = await ctx.model.Comment.findOne({
      _id: params.id,
    });

    if (!oldIdComment) {
      return {
        msg: "评论不存在",
      };
    }

    const updateData = {
      auditStatus: params.auditStatus,
    };
    await ctx.model.Comment.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "评论修改成功",
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Comment.create(data);
    return {
      msg: "评论添加成功",
      data: res,
    };
  }
}

module.exports = CommentService;
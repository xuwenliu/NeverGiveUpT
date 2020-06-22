const Service = require("egg").Service;

class RightRecommendService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(params) {
    const { ctx } = this;
    const res = await ctx.model.Config.Right.Recommend.find({
      project: params.project,
    });
    return {
      msg: `推荐设置获取成功`,
      data: res,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };

    const oldRightRecommend = await ctx.model.Config.Right.Recommend.find({
      name: params.name,
    });

    if (oldRightRecommend.length === 0) {
      const res = await ctx.model.Config.Right.Recommend.create(data);
      return {
        msg: "推荐设置添加成功",
        data: res,
      };
    } else {
      return {
        msg: "推荐设置已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldRightRecommend = await ctx.model.Config.Right.Recommend.findOne({
      _id: params.id,
    });

    if (oldRightRecommend) {
      const updateData = {
        ...params,
        createTime: oldRightRecommend.createTime,
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Right.Recommend.findByIdAndUpdate(
        {
          _id: params.id,
        },
        updateData,
        {
          new: true, // 返回修改后的数据。
          runValidators: true, //如果值为true，执行Validation验证。
        }
      );
      return {
        msg: "推荐设置修改成功",
        data: res,
      };
    } else {
      return {
        msg: "推荐设置不存在",
      };
    }
  }
}

module.exports = RightRecommendService;
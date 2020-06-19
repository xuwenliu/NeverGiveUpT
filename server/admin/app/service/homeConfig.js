const Service = require("egg").Service;

class HomeConfigService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.HomeConfig.findOne();
    return {
      msg: "首页配置信息获取成功",
      data: res,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const oldHomeConfigCount = await ctx.model.HomeConfig.find({}).countDocuments();
    if (oldHomeConfigCount === 0) {
      const res = await ctx.model.HomeConfig.create(data);
      return {
        msg: "首页配置信息添加成功",
        data: res,
      };
    } else {
      return {
        msg: "首页配置信息已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;
    const updateData = {
      ...params,
      updateTime: ctx.helper.moment().unix(),
    };
    const oldHomeConfig = await ctx.model.HomeConfig.findOne({
      _id: params.id,
    });
    if (oldHomeConfig) {
      const res = await ctx.model.HomeConfig.findByIdAndUpdate(
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
        msg: "首页配置信息修改成功",
        data: res,
      };
    } else {
      return {
        msg: "首页配置信息不存在",
      };
    }
  }
}

module.exports = HomeConfigService;

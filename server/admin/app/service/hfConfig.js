const Service = require("egg").Service;

class HfService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.HfConfig.findOne();
    return {
      msg: "Header/Footer配置信息获取成功",
      data: res,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const oldHfConfigCount = await ctx.model.HfConfig.find({}).countDocuments();
    if (oldHfConfigCount === 0) {
      const res = await ctx.model.HfConfig.create(data);
      return {
        msg: "Header/Footer配置信息添加成功",
        data: res,
      };
    } else {
      return {
        msg: "Header/Footer配置信息已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;
    const updateData = {
      ...params,
      updateTime: ctx.helper.moment().unix(),
    };
    const oldHfConfig = await ctx.model.HfConfig.findOne({
      _id: params.id,
    });
    if (oldHfConfig) {
      const res = await ctx.model.HfConfig.findByIdAndUpdate(
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
        msg: "Header/Footer配置信息修改成功",
        data: res,
      };
    } else {
      return {
        msg: "Header/Footer配置信息不存在",
      };
    }
  }
}

module.exports = HfService;

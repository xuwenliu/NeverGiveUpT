const Service = require("egg").Service;

class ArchivesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const data = await ctx.model.Articles.find({
      status: 1,
      publishStatus: 1,
    }).sort({ createTime: -1 });
    return {
      msg: "归档信息获取成功",
      data,
    };
  }
}

module.exports = ArchivesService;

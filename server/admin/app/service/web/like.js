const Service = require("egg").Service;

class LikeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async submit(params) {
    const { ctx } = this;

    const oldLike = await ctx.model.Articles.findOne({
      _id: params.articleId,
    });
    const res = await ctx.model.Articles.updateOne(
      {
        _id: params.articleId,
      },
      {
        like: oldLike.like + 1,
      }
    );
    return {
      msg: "点赞成功",
      data: res,
    };
  }
}

module.exports = LikeService;

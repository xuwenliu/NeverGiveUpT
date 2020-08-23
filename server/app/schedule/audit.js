module.exports = {
  schedule: {
    cron: "0 0 0 1 * *", // 一天执行一次
    type: "all", // 指定所有的 worker都需要执行
  },
  async task(ctx) {
    await ctx.model.Comment.updateMany(
      {
        auditStatus: "3",
      },
      {
        auditStatus: "1",
        auditTime: ctx.helper.moment().unix(),
      }
    );
  },
};

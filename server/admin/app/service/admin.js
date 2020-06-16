const Service = require("egg").Service;

class AdminService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 管理员登录
  async adminLogin(params) {
    const { ctx, app } = this;

    const oldUser = await ctx.model.Admin.findOne({
      userName: params.userName,
    });

    if (!oldUser) {
      return {
        msg: "用户不存在",
      };
    }
    const isMatch = await ctx.helper.comparePassword(
      params.password,
      oldUser.password
    );
    if (!isMatch) {
      return {
        msg: "用户名或密码错误",
      };
    }

    //生成token
    const token = app.jwt.sign(
      {
        userName: oldUser.userName,
      },
      app.config.jwt.secret
    );

    return {
      data: {
        token,
      },
      msg: "登录成功",
    };
  }
}

module.exports = AdminService;

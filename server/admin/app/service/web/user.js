const Service = require("egg").Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  async register(params) {
    const { ctx, app } = this;
    const { nickName, email } = params;

    const emailRes = await ctx.model.User.findOne({
      email,
    });
    if (emailRes) {
      return {
        msg: "email已经存在",
      };
    }

    const nickNameRes = await ctx.model.User.findOne({
      nickName,
    });

    if (nickNameRes) {
      return {
        msg: "该昵称已经存在",
      };
    }

    const data = {
      ...params,
      registerTime: ctx.helper.moment().unix(),
    };

    await ctx.model.User.create(data);

    //生成token
    const token = app.jwt.sign(
      {
        email,
      },
      app.config.jwt.secret
    );

    //注册成功后设置cookie-直接登录
    ctx.cookies.set("token", token, {
      maxAge: 86400000, //一天过期时间
      httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      msg: "注册成功",
      data: {
        token,
        email,
        nickName,
      },
    };
  }

  async login(params) {
    const { ctx, app } = this;
    const { email, password } = params;
    // 这里是昵称或email搜索，前端传递字段为email
    const queryCon = {
      $or: [{ nickName: email }, { email: email }],
    };
    const queryRes = await ctx.model.User.findOne(queryCon);
    if (!queryRes) {
      return {
        msg: "email或昵称不存在",
      };
    }

    const passwordRes = await ctx.model.User.findOne({
      ...queryCon,
      password,
    });
    if (!passwordRes) {
      return {
        msg: "email或昵称或密码错误",
      };
    }

    //生成token
    const token = app.jwt.sign(
      {
        email,
      },
      app.config.jwt.secret
    );

    //登录成功后设置cookie
    ctx.cookies.set("token", token, {
      maxAge: 86400000, //一天过期时间
      httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      msg: "登录成功",
      data: {
        email,
        token,
      },
    };
  }
  async logout() {
    const { ctx } = this;
    ctx.cookies.set("token", "", {
      maxAge: 0, //清除cookie
    });
    return {
      msg: "退出登录成功",
    };
  }
}

module.exports = UserService;

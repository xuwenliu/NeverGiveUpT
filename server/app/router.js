/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;

  router.get('/auth',controller.auth.index); // 微信公众号验证token

  // 后台接口
  const baseRouter = app.config.baseRouter; // /api/v1
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin); // 管理员登录
  router.post(baseRouter + "/upload", jwt, controller.utils.uploadFiles); //上传文件到七牛云

  router.resources(
    "articles",
    baseRouter + "/articles",
    jwt,
    controller.articles
  ); // 文章
  router.put(
    baseRouter + "/articles/status/:id",
    jwt,
    controller.articles.changeStatus
  ); // 文章-启用、停用
  router.put(
    baseRouter + "/articles/publishStatus/:id",
    jwt,
    controller.articles.changePublishStatus
  ); // 文章-更改发布状态
  router.put(
    baseRouter + "/articles/sort/:id",
    jwt,
    controller.articles.changeSort
  ); // 文章-排序和置顶

  router.resources(
    "categories",
    baseRouter + "/categories",
    jwt,
    controller.categories
  ); // 分类

  router.resources("tags", baseRouter + "/tags", jwt, controller.tags); // 标签
  router.put(
    baseRouter + "/tags/status/:id",
    jwt,
    controller.tags.updateStatus
  ); // 标签-修改状态

  router.resources("about", baseRouter + "/about", jwt, controller.about); // 关于
  router.resources("user", baseRouter + "/user", jwt, controller.user); // 用户
  router.resources("comment", baseRouter + "/comment", jwt, controller.comment); // 评论

  router.resources(
    "config",
    baseRouter + "/config/home",
    jwt,
    controller.config.home
  ); // 首页配置
  router.resources(
    "config",
    baseRouter + "/config/hf",
    jwt,
    controller.config.hf
  ); // header/footer配置
  router.resources(
    "config",
    baseRouter + "/config/right/introduction",
    jwt,
    controller.config.right.introduction
  ); // 右侧配置-个人简介
  router.resources(
    "config",
    baseRouter + "/config/right/ad",
    jwt,
    controller.config.right.ad
  ); // 右侧配置-广告设置
  router.resources(
    "config",
    baseRouter + "/config/right/recommend",
    jwt,
    controller.config.right.recommend
  ); // 右侧配置-推荐设置

  router.resources("resume", baseRouter + "/resume", jwt, controller.resume); // 简历
  router.put(
    baseRouter + "/resume/status/:id",
    jwt,
    controller.resume.updateStatus
  ); // 简历-修改状态

  // 前台接口
  const webRouter = baseRouter + "/web";
  router.get(webRouter + "/home", controller.web.home.index); //首页信息获取
  router.get(webRouter + "/header", controller.web.header.index); //导航栏信息获取

  router.get(webRouter + "/categories", controller.web.categories.index); //分类信息获取
  router.get(
    webRouter + "/categories/details",
    controller.web.categories.details
  ); //分类下的文章列表信息获取

  router.get(webRouter + "/tags", controller.web.tags.index); //标签信息获取
  router.get(webRouter + "/tags/details", controller.web.tags.details); //标签下的文章列表信息获取

  router.get(webRouter + "/about", controller.web.about.index); //关于信息获取
  router.get(webRouter + "/archives", controller.web.archives.index); //归档信息获取

  router.get(webRouter + "/articles", controller.web.articles.index); //文章列表获取
  router.get(webRouter + "/articles/details", controller.web.articles.details); //文章详情获取

  router.get(webRouter + "/rightConfig", controller.web.rightConfig.index); //右侧广告，推荐获取

  router.post(webRouter + "/register", controller.web.user.register); //注册
  router.post(webRouter + "/login", controller.web.user.login); //登录
  router.post(webRouter + "/logout", controller.web.user.logout); //退出登录
  router.get(webRouter + "/captcha", controller.web.user.captcha); // 生成验证码

  router.post(webRouter + "/comment", jwt, controller.web.comment.submit); //提交评论
  router.get(webRouter + "/comment/list", controller.web.comment.list); //评论列表
  router.post(webRouter + "/like", jwt, controller.web.like.submit); //点赞

  router.get(webRouter + "/resume", controller.web.resume.index); //简历列表获取
};

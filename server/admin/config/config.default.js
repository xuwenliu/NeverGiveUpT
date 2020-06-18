/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1592223477170_7907";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  config.errorHandler = {
    match: "/api/v1",
  };

  // post请求忽略csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.bcrypt = {
  //   saltRounds: 10, // default 10
  // };

  config.mongoose = {
    url: "mongodb://127.0.0.1:27017/blog",
    options: {},
  };

  config.jwt = {
    secret: "NeverGiveUpT",
  };

  // add your user config here
  const userConfig = {
    myAppName: "blog-server-admin",
    baseRouter: "/api/v1", // 基本路由
    PAGE: 1,
    PAGE_SIZE: 10,
    // 七牛云配置
    bucket: "nevergiveupt-blog", //要上传的空间名
    imageUrl: "http://qc437ldbv.bkt.clouddn.com/", // 空间绑定的域名
    accessKey: "9qMN42CxUM0zrWrLtbd6DnTvEgDZFneWOlCR0HC-", //Access Key
    secretKey: "CvWnHFlY9iZOaFdMG4jgYMVtmhzCXN3bVAv5NLZ3", //Secret Key
  };

  return {
    ...config,
    ...userConfig,
  };
};

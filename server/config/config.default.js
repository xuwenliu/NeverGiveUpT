/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const userConfig = require("./config.user");

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

  config.cluster = {
    listen: {
      path: "",
      port: 7002,
      hostname: "127.0.0.1",
    },
  };

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
    options: {
      useNewUrlParser: true,
    },
  };

  config.jwt = {
    secret: "NeverGiveUpT",
  };

  return {
    ...config,
    ...userConfig,
  };
};

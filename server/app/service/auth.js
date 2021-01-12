const Service = require("egg").Service;
const sha1 = require("sha1");
const {
  getUserDataAsync,
  parserXMLDataAsync,
  formatData,
} = require("../utils");
const messageTemplate = require("../utils/messageTemplate");
const replayMessage = require("../utils/replayMessage");

class AuthService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(params) {
    const { ctx, app } = this;
    const { signature, timestamp, nonce, echostr } = params; // 微信会下发这4个参数
    /**
     * 开发者通过检验signature对请求进行校验（下面有校验方式）。
     * 若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，
     * 则接入生效，成为开发者成功，否则接入失败。加密/校验流程如下：
        1）将token、timestamp、nonce三个参数进行字典序排序 
        2）将三个参数字符串拼接成一个字符串进行sha1加密 
        3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
     */
    let token = app.config.token; // 你自己填写的token
    let array = [timestamp, nonce, token];
    array.sort(); // 字典序排序
    let str = array.join(""); // 串拼接成一个字符串
    let sha1Str = sha1(str); //进行sha1加密
    if (signature === sha1Str) {
      ctx.set({
        "content-type": "text/plain",
      });
      ctx.body = echostr; // 原样返回echostr参数内容
    } else {
      ctx.body = "";
    }
    // 返回这个结果用于微信获取用户发送的消息时验证是否来自微信服务器
    return signature === sha1Str;
  }

  async signature(params) {
    const { ctx, app, service } = this;
    let { url } = params; // 前端会传递url给后端
    url = decodeURIComponent(url);
    const res = await service.utils.sign(url);
    return {
      data: res,
      msg: "获取签名参数成功",
    };
  }

  async replay(message) {
    if (message) {
      // https://github.com/node-webot/co-wechat
      let content = "NeverGiveUpT";
      if (message.MsgType === "text") {
        if (message.Content === "1") {
          //全匹配
          content = "我叫NeverGiveUpT-1";
        } else if (message.Content === "2") {
          content = "我叫NeverGiveUpT-2";
        } else if (message.Content.match("TA")) {
          //半匹配
          content = "我叫NeverGiveUpT-TA";
        }
      }
      return content;
    } else {
      const { ctx, app } = this;
      const isFromWeChat = await ctx.service.auth.index(ctx.request.query);
      if (isFromWeChat) {
        const xmlData = await getUserDataAsync(ctx.req);
        const jsData = await parserXMLDataAsync(xmlData);
        const message = formatData(jsData);
        const options = replayMessage(message);
        const replyMessage = messageTemplate(options);
        return {
          data: replyMessage,
        };
      }
    }
  }
}

module.exports = AuthService;

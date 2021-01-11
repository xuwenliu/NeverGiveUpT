const {
  getUserDataAsync,
  parserXMLDataAsync,
  formatData,
} = require("../utils");
const moment = require("moment");

module.exports = (options, app) => {
  return async function weChatAuth(ctx, next) {
    await next();

    const isFromWeChat = await ctx.service.auth.index(ctx.request.query);
    if (ctx.request.method.toUpperCase() === "POST" && isFromWeChat) {
      //接收请求体数据
      const xmlData = await getUserDataAsync(ctx.req);
      /* {
        开发者id <xml><ToUserName><![CDATA[gh_944b3ad2b600]]></ToUserName>
        用户id   <FromUserName><![CDATA[o3Ce86i0MRKT8H0s3zCTPLkMTr44]]></FromUserName>
        时间戳   <CreateTime>1610343689</CreateTime>
        消息类型  <MsgType><![CDATA[text]]></MsgType>
        内容      <Content><![CDATA[1]]></Content>
        微信消息id <MsgId>23054578540298560</MsgId>
                </xml>
      }
      */

      //将 xml解析为js对象
      const jsData = await parserXMLDataAsync(xmlData);

      //格式化数据
      const message = formatData(jsData);
      // console.log(message);
      /*{
        ToUserName: 'gh_944b3ad2b600',
        FromUserName: 'o3Ce86i0MRKT8H0s3zCTPLkMTr44',
        CreateTime: '1610344004',
        MsgType: 'text',
        Content: '3',
        MsgId: '23054581672430359'
      }
      */
      let content = "NeverGiveUpT";
      if (message.MsgType === "text") {
        if (message.Content === "1") {
          //全匹配
          content = "我叫NeverGiveUpT-1";
        } else if (message.Content === "2") {
          content = "我叫NeverGiveUpT-2";
        } else if (message.Content.match("TA")) {
          //半匹配
          content = "我叫NeverGiveUpT-半匹配";
        }
      }

      const replyMessage = `<xml>
      <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
      <CreateTime>${moment.unix()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
      </xml>`;
      console.log(replyMessage);
      ctx.body = replyMessage;
    } else {
      ctx.body = "";
    }
  };
};

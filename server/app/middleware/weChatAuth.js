const {
  getUserDataAsync,
  parserXMLDataAsync,
  formatData,
} = require("../utils");
const messageTemplate = require("../utils/messageTemplate");
const replayMessage = require("../utils/replayMessage");
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
      const options = replayMessage(message);
      const replyMessage = messageTemplate(options); // 回复给用户的消息
      console.log(replyMessage);
      ctx.body = replyMessage;
    }
  };
};

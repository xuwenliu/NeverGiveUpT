const Service = require("egg").Service;
const sha1 = require("sha1");
const toArray = require("stream-to-array");
const WeChatAPI = require("co-wechat-api");
const fs = require("fs");
const path = require("path");

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
    this.api = new WeChatAPI(ctx.app.config.appId, ctx.app.config.AppSecret);
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

  async createMenu() {
    const { ctx, app, service } = this;
    const menu = {
      button: [
        {
          type: "click",
          name: "今日歌曲",
          key: "V1001_TODAY_MUSIC",
        },
        {
          name: "菜单",
          sub_button: [
            {
              type: "view",
              name: "搜索",
              url: "http://www.soso.com/",
            },
            {
              type: "click",
              name: "赞一下我们",
              key: "V1001_GOOD",
            },
          ],
        },
      ],
    };

    // const data = await service.utils.getTicket();
    // const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
    // const result = await ctx.curl(url, {
    //   method: "POST",
    //   contentType: "json",
    //   dataType: "json",
    //   data: menu,
    // });

    const result = await this.api.createMenu(menu);
    return {
      data: result,
      msg: "创建菜单成功",
    };
  }

  async removeMenu() {
    // const { ctx, app, service } = this;
    // const data = await service.utils.getTicket();
    // const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`;
    // const result = await ctx.curl(url, {
    //   dataType: "json",
    // });
    const result = await this.api.removeMenu();
    return {
      data: result,
      msg: "删除菜单成功",
    };
  }

  async uploadMedia(params) {
    const { ctx, app, service } = this;
    params = params || {
      type: "image",
    };
    // 前端传递参数用formData数据
    // const formData = new FormData();
    // formData.append(file); // file即选择的文件 将formData发生到后台

    // 后台通过文件流获取数据
    const stream = await ctx.getFileStream();
    const parts = await toArray(stream);
    const buf = Buffer.concat(parts);
    
    // co-wechat-api 的uploadMedia方法要求我们传递文件路径/文件Buffer数据​
    const result = await this.api.uploadMedia(
      buf,
      params.type,
      stream.filename
    );
    /* 正常情况下需要往自己的数据库存储以下4个字段:
      type: 可取值 image,video,voice,thumb
      fileName, 文件名称 可从stream.filename获取【2.png】
      media_id, 媒体id 由微信返回result.media_id - 用于获取上传的临时素材
      mimeType, 文件后缀名 可从stream.mimeType获取 - 如果是图片【image/png】用于返回前端base64格式做拼接
    */
    return {
      data: result,
      msg: params.type + "类型的临时素材上传成功",
    };
  }

  async getMedia(params) {
    params = {
      ...params,
      type: params.type || "image",
    };
    const result = await this.api.getMedia(params.mediaId);
    const fileName = Date.now() + ".png"; // 文件名称 -正常情况是通过mediaId去数据库查询获取
    const pathFile = path.resolve(__dirname, "../../media", fileName); // 文件存储的路径

    let data = null;

    // 图片和缩略图
    if (params.type === "image" || params.type === "thumb") {
      const base64 = result.toString("base64");
      data = `data:image/png;base64,` + base64; // 这里的拼接的【image/png】也是需要通过mediaId去数据库查询获取mimeType字段

      // 将文件下载到服务端-也可以不下载-直接返回给前端base64的图片
      fs.writeFile(pathFile, base64, (err) => {
        if (err) {
          console.log(err);
        }
      });
      // 如果将文件上传到其他地方（七牛云）可以在这里操作
    }

    // 视频
    if (params.type === "video") {
      data = result.video_url;
    }

    // 语音
    if (params.type === "voice") {
      // 语音和图片类似。需要上传到自己的文件存储的地方（七牛云）
    }

    return {
      data: {
        ...params,
        data,
      },
      msg: params.type + "临时素材获取成功",
    };
  }
}

module.exports = AuthService;

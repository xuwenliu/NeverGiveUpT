const fs = require("fs");
const path = require("path");
const qiniu = require("qiniu");
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const md5 = require("md5");

const Service = require("egg").Service;

class UtilsService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  async uploadFiles() {
    const { ctx, app } = this;
    const mac = new qiniu.auth.digest.Mac(
      app.config.accessKey,
      app.config.secretKey
    );
    const options = {
      scope: app.config.bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;

    const stream = await ctx.getFileStream();
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, "../public/uploads", filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(app.config.imageUrl + respBody.key);
            } else {
              reject("");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });
      if (imgSrc !== "") {
        return {
          url: imgSrc,
        };
      } else {
        return false;
      }
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }
  }
}

module.exports = UtilsService;

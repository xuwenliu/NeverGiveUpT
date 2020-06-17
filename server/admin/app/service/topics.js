const Service = require('egg').Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign({
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }


  // get list
  async index(params) {
    const result = await this.request('/topics', {
      data: params,
    });
    this.checkSuccess(result);
    return result.data.data;
  }


  // post
  async create(params) {
    // 调用 CNode V1 版本 API
    const result = await this.request('/topics', {
      method: 'post',
      data: params,
      contentType: 'json',
    });
    // 检查调用是否成功，如果调用失败会抛出异常
    this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result.data.topic_id;
  }

  // put update
  async update(params) {
    const result = await this.request('/topics/update', {
      method: 'post',
      data: params,
      contentType: 'json',
    });

    this.checkSuccess(result);
  }

  // get 详情
  async show(params) {
    const result = await this.request(`/topic/${params.id}`, {
      data: {
        mdrender: params.mdrender,
        accesstoken: params.accesstoken,
      },
    });
    this.checkSuccess(result);

    return result.data.data;
  }


  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = TopicService;

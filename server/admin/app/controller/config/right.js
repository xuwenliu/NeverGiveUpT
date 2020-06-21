const Controller = require("egg").Controller;

class RightController extends Controller {
  constructor(ctx) {
    super(ctx);

    const introductionRule = {
      introduction: {
        type: 'object',
        rule: {
          nickName: {
            type: "string",
            min: 2,
            max: 20
          },
          desc: {
            type: "string",
            min: 2,
            max: 500
          },
          tags: {
            type: "array",
            itemType: "object",
            min: 1,
            max: 10,
            rule: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string',
                min: 2,
                max: 20,
                format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
              },
            },

          },
          frendLink: {
            type: 'array',
            itemType: 'object',
            rule: {
              url: {
                type: 'string'
              },
              icon: {
                type: 'string'
              }
            },
            min: 1,
            max: 4
          },
          showPosition: {
            type: 'array',
            itemType: 'object',
            rule: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string',
              }
            },
            min: 1,
            max: 10
          },
          createTime: {
            type: "number",
            required: false,
            default: 0,
          },
          updateTime: {
            type: "number",
            required: false,
            default: 0,
          },
        }
      },
    }
    const adRule = {
      ad: {
        type: 'object',
        rule: {

          imgs: {
            type: 'array',
            itemType: 'object',
            min: 1,
            max: 3,
            rule: {
              url: {
                type: 'url',
              },
              link: {
                type: 'url',
              }
            }
          },
          showPosition: {
            type: 'array',
            itemType: 'object',
            rule: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string',
              }
            },
            min: 1,
            max: 10
          },
          createTime: {
            type: "number",
            required: false,
            default: 0,
          },
          updateTime: {
            type: "number",
            required: false,
            default: 0,
          },
        }


      }
    }

    const recommentRule = {
      recomment: {

      }
    }

    this.map = new Map([
      [1, ['introduction', '个人简介', introductionRule]],
      [2, ['ad', '广告设置', adRule]],
      [3, ['recomment', '推荐设置', recommentRule]],
    ])

  }
  async index() {
    const {
      ctx,
      service
    } = this;
    const {
      type = 1
    } = ctx.request.query;
    const res = await service.config.right.index(type);
    ctx.helper.success({
      ctx,
      res
    });
  }

  async create() {
    const {
      ctx,
      service
    } = this;
    const data = ctx.request.body;
    const type = data.type * 1 || 1;
    const createRule = this.map.get(type)[2];
    ctx.validate(createRule, data);
    const res = await service.config.right.create(data);
    ctx.helper.success({
      ctx,
      res
    });
  }
  async update() {
    const {
      ctx,
      service
    } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const type = data.type * 1 || 1;
    const createRule = this.map.get(type)[2];
    ctx.validate(createRule, data);
    const res = await service.config.right.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res
    });
  }
}

module.exports = RightController;
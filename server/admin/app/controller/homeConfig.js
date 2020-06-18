const Controller = require("egg").Controller;

class HomeConfigController extends Controller {
    constructor(ctx) {
        super(ctx);

        this.createRule = {
            homeBgImg: {
                type: "string",
            },
            avatar: {
                type: "string",
            },
            avatarRotate: {
                type: "boolean",
                default: false,
            },
            introduction: { // 简介
                type: "string",
                min: 2,
                max: 1000,
            },
            effects: { // 打字特效
                type: "boolean",
                default: false,
            },

            articleBgImg: {
                type: "string",
            },
            articleDetailBgImg: {
                type: "string",
            },
            archiveBgImg: { // 归档
                type: "string",
            },
            categoriesBgImg: { // 分类
                type: "string",
            },
            categoriesDetailBgImg: {
                type: "string",
            },
            tagsBgImg: {
                type: "string",
            },
            aboutBgImg: {
                type: "string",
            }
        };
    }
    async index() {
        const {
            ctx
        } = this;
        const res = await ctx.service.homeConfig.index();
        ctx.helper.success({
            ctx,
            res
        });
    }

    async create() {
        const {
            ctx
        } = this;
        const data = ctx.request.body;
        ctx.validate(this.createRule, data);
        const res = await ctx.service.homeConfig.create(data);
        ctx.helper.success({
            ctx,
            res
        });
    }
    async update() {
        const {
            ctx
        } = this;
        const data = ctx.request.body;
        const id = ctx.params.id;
        ctx.validate(this.createRule, data);
        const res = await ctx.service.homeConfig.update({
            id,
            ...data,
        });
        ctx.helper.success({
            ctx,
            res
        });
    }
}

module.exports = HomeConfigController;
const Service = require("egg").Service;

class CategoriesService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    // 分类列表
    async index(params) {
        const {
            ctx,
            app
        } = this;

        const page = params.page * 1 || ctx.config.PAGE;
        const pageSize = params.pageSize * 1 || ctx.config.PAGE_SIZE;
        const totalCount = await ctx.model.Categories.find().countDocuments();

        const queryCon = params.name ? {
            name: params.name
        } : {};
        const data = await ctx.model.Categories.find(queryCon).skip((page - 1) * pageSize).limit(pageSize);
        return {
            data: {
                page,
                pageSize,
                totalCount,
                list: data
            },
            msg: "分类列表获取成功",
        };
    }

    // 添加分类
    async create(params) {
        const {
            ctx
        } = this;
        const data = {
            ...params,
            createTime: ctx.helper.moment().unix()
        }
        const res = await ctx.model.Categories.create(data);
        return {
            msg: "分类添加成功",
            data: res
        }
    }

    // 删除分类
    async destroy(id) {
        const {
            ctx
        } = this;

        const oldCategories = await ctx.model.Categories.findOne(id);
        if (!oldCategories) {
            return {
                msg: "分类不存在",
                data: oldCategories
            }
        }

        const res = await ctx.model.Categories.remove(id);
        return {
            msg: "分类删除成功",
            data: res
        }
    }

    // 修改分类
    async update(params) {
        const {
            ctx
        } = this;

        console.log('params', params)
        const oldCategories = await ctx.model.Categories.findOne({
            _id: params.id
        });

        if (!oldCategories) {
            return {
                msg: "分类不存在",
                data: oldCategories
            }
        }

        if(oldCategories.name === params.name){
            return {
                msg: "分类修改成功",
                data: null
            }
        }

        const updateData = {
            updateTime: ctx.helper.moment().unix(),
            name: params.name
        }
        await ctx.model.Categories.updateOne({
            _id: params.id
        }, updateData);
        return {
            msg: "分类修改成功",
            data: null
        }
    }
}

module.exports = CategoriesService;
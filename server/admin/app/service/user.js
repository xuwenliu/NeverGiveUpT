const Service = require("egg").Service;

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async index(params) {
        const {
            ctx
        } = this;

        const page = params.page * 1 || ctx.config.PAGE;
        const pageSize = params.pageSize * 1 || ctx.config.PAGE_SIZE;
        const totalCount = await ctx.model.User.count();

        const queryCon = params.nickName ? {
            nickName: params.nickName
        } : {};
        const data = await ctx.model.User.find(queryCon).skip((page - 1) * pageSize).limit(pageSize);
        return {
            data: {
                page,
                pageSize,
                totalCount,
                list: data
            },
            msg: "用户列表获取成功",
        };
    }

    async destroy(id) {
        const {
            ctx
        } = this;

        const oldUser = await ctx.model.User.findOne({
            _id: id
        });
        if (!oldUser) {
            return {
                msg: "用户不存在",
            }
        }

        await ctx.model.User.remove({
            _id: id
        });
        return {
            msg: "用户删除成功",
        }

    }
}

module.exports = UserService;
const Service = require("egg").Service;

class RightService extends Service {
    constructor(ctx) {
        super(ctx);
        this.map = new Map([
            [1, ['introduction', '个人简介']],
            [2, ['ad', '广告设置']],
            [3, ['recomment', '推荐设置']],
        ])
        this.tabTitle = type => this.map.get(type)[0]; // introduction
        this.tabTitleChinese = type => this.map.get(type)[1]; //个人简介
    }

    async index(type) {
        type *= 1;
        const {
            ctx
        } = this;
        const res = await ctx.model.Config.Right.findOne();

        const data = res && res[this.tabTitle(type)] ? {
            _id: res._id,
            [this.tabTitle(type)]: res[this.tabTitle(type)]
        } : null;
        return {
            msg: `${this.tabTitleChinese(type)}配置信息获取成功`,
            data,
        };
    }

    async create(params) {
        const {
            ctx
        } = this;
        let {
            type = 1
        } = params;
        type *= 1;
        const oldRight = await ctx.model.Config.Right.findOne();

        const newParams = {
            ...params[this.tabTitle(type)],
            createTime: ctx.helper.moment().unix(),
        }

        const data = {
            ...params,
            [this.tabTitle(type)]: newParams
        };
        const add = async () => {
            const res = await ctx.model.Config.Right.create(data);
            return {
                msg: `${this.tabTitleChinese(type)}配置信息添加成功`,
                data: res,
            };
        }

        if (!oldRight) {
            return add();
        } else {
            return oldRight[this.tabTitle(type)] ? {
                msg: `${this.tabTitleChinese(type)}配置信息已存在`,
            } : add();
        }

    }

    async update(params) {
        const {
            ctx
        } = this;
        let {
            type = 1
        } = params;

        type *= 1;

        const updateDataFunc = async (createTime) => {
            const newParams = {
                ...params[this.tabTitle(type)],
                createTime,
                updateTime: ctx.helper.moment().unix(),
            }

            const updateData = {
                ...params,
                [this.tabTitle(type)]: newParams
            };

            const res = await ctx.model.Config.Right.findByIdAndUpdate({
                    _id: params.id,
                },
                updateData, {
                    new: true, // 返回修改后的数据。
                    runValidators: true, //如果值为true，执行Validation验证。
                }
            );
            return {
                msg: `${this.tabTitleChinese(type)}配置信息修改成功`,
                data: res,
            };
        }

        const oldRight = await ctx.model.Config.Right.findOne({
            _id: params.id,
        });

        console.log(oldRight)
        if (!oldRight) {
            return {
                msg: `${this.tabTitleChinese(type)}配置信息不存在`,
            };
        } else {
            const old = oldRight[this.tabTitle(type)];
            return old ? updateDataFunc(old.createTime) : {
                msg: `${this.tabTitleChinese(type)}配置信息不存在`,
            };
        }
    }
}

module.exports = RightService;
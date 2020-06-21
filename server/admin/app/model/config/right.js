module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TagsSchema = new Schema({
        _id: {
            type: 'ObjectId',
        },
        name: {
            type: 'string',
            min: 2,
            max: 20,
            format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
        }
    })

    const FrendLinkSchema = new Schema({
        url: {
            type: 'string'
        },
        icon: {
            type: 'string'
        }
    })

    const ShowPositionSchema = new Schema({
        _id: {
            type: 'ObjectId'
        },
        name: {
            type: 'string',
        }
    })


    const IntroductionSchema = new Schema({
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
            type: [TagsSchema],
            min: 1,
            max: 10
        },
        frendLink: {
            type: [FrendLinkSchema],
            min: 1,
            max: 4
        },
        showPosition: {
            type: [ShowPositionSchema],
            min: 1,
            max: 10
        },
        createTime: {
            type: "number",
            default: 0,
        },
        updateTime: {
            type: "number",
            default: 0,
        },
    });


    const ImgsSchema = new Schema({
        url: {
            type: 'string',
        },
        link: {
            type: 'string',
        }
    })
    const AdSchema = new Schema({
        imgs: {
            type: [ImgsSchema],
            min: 1,
            max: 3
        },
        showPosition: {
            type: [ShowPositionSchema],
            min: 1,
            max: 10
        },
        createTime: {
            type: "number",
            default: 0,
        },
        updateTime: {
            type: "number",
            default: 0,
        },
    });

    const RecommendSchema = new Schema({
        name: {
            type: "string",
            min: 2,
            max: 4,
        },
        router: {
            type: "string",
            match: /^[a-z]{1,50}$/,
            min: 1,
            max: 50,
        },
        sort: {
            type: "number",
            max: 9999,
            default: 0,
        },
        status: {
            type: "boolean",
            default: true,
        },
    });

    const RightSchema = new Schema({
        introduction: {
            type: IntroductionSchema,
        },
        ad: {
            type: AdSchema,
        },
        recomment: {
            type: RecommendSchema
        }
    }, {
        collection: "right",
        versionKey: false,
    });

    return mongoose.model("Right", RightSchema);
};
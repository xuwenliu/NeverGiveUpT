module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const HomeSchema = new Schema({
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
            max: 100,
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
        },
        createTime: {
            type: "number",
            default: 0,
        },
        updateTime: {
            type: "number",
            default: 0,
        },

    }, {
        collection: "home",
        versionKey: false,
    });

    return mongoose.model("Home", HomeSchema);
};
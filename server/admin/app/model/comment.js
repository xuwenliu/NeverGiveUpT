const helper = require("../extend/helper");

module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const CommentSchema = new Schema({
        nickName: {
            type: "string",
            required: false,
            max: 20,
        },
        articleTitle: {
            type: "string",
            min: 2,
            max: 200,
        },
        targetReplayContent: {
            type: "string",
            required: false,
            max: 200,
        },
        currentReplayContent: {
            type: "string",
            required: false,
            max: 200,
        },
        commentTime: {
            type: "number",
            default: 0,
        },
        auditStatus: {
            type: "number",
            min: 0, // 0=未审核 1=通过 2=驳回
            max: 2,
            default: 0,
        },
    }, {
        collection: "comment",
        versionKey: false,
    });

    return mongoose.model("Comment", CommentSchema);
};
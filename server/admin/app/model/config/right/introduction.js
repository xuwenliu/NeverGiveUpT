module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TagsSchema = new Schema({
    _id: {
      type: "ObjectId",
    },
    name: {
      type: "string",
      min: 2,
      max: 20,
      format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
    },
  });

  const FrendLinkSchema = new Schema({
    url: {
      type: "string",
    },
    icon: {
      type: "string",
    },
  });

  const ShowPositionSchema = new Schema({
    _id: {
      type: "ObjectId",
    },
    name: {
      type: "string",
    },
  });

  const RightIntroductionSchema = new Schema(
    {
      nickName: {
        type: "string",
        min: 2,
        max: 20,
      },
      desc: {
        type: "string",
        min: 2,
        max: 500,
      },
      tags: {
        type: [TagsSchema],
        min: 1,
        max: 10,
      },
      frendLink: {
        type: [FrendLinkSchema],
        min: 1,
        max: 4,
      },
      showPosition: {
        type: [ShowPositionSchema],
        min: 1,
        max: 10,
      },
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
    },
    {
      collection: "right_introduction",
      versionKey: false,
    }
  );

  return mongoose.model("RightIntroduction", RightIntroductionSchema);
};

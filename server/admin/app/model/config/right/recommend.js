module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ShowPositionSchema = new Schema({
    _id: {
      type: "ObjectId",
    },
    name: {
      type: "string",
    },
  });

  const RightRecommendSchema = new Schema(
    {
      project: {
        type: "number",
        min: 1,
        max: 3,
      },
      showPosition: {
        type: [ShowPositionSchema],
        min: 1,
        max: 10,
      },
      name: {
        type: "string",
        min: 2,
        max: 50,
      },
      coverImg: {
        type: "string",
      },
      link: {
        type: "string",
      },
      platform: {
        type: "string",
        min: 2,
        max: 20,
      },
      isVip: {
        type: "boolean",
        default: false,
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
      collection: "right_recomment",
      versionKey: false,
    }
  );

  return mongoose.model("RightRecomment", RightRecommendSchema);
};

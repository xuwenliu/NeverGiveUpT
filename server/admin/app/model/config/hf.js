module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema({
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
      min: -9999,
      max: 9999,
      default: 0,
    },
    status: {
      type: "boolean",
      default: true,
    },
  });
  const HeaderSchema = new Schema({
    logo: {
      type: "string",
      required: false,
    },
    title: {
      type: "string",
      required: false,
      max: 20,
    },
    fixedHeader: {
      type: "boolean",
      default: true,
    },
    openSearch: {
      type: "boolean",
      default: true,
    },
    login: {
      type: "boolean",
      default: false,
    },
    register: {
      type: "boolean",
      default: false,
    },
    menu: {
      type: [MenuSchema],
      max: 10,
    },
  });

  const FooterSchema = new Schema({
    copyright: {
      type: "string",
      min: 1,
      max: 200,
    },
    extra: {
      type: "string",
      min: 1,
      max: 200,
    },
  });
  const HfSchema = new Schema(
    {
      header: {
        type: HeaderSchema,
      },
      footer: {
        type: FooterSchema,
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
      collection: "hf",
      versionKey: false,
    }
  );

  return mongoose.model("Hf", HfSchema);
};

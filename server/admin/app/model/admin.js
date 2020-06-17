
const helper = require("../extend/helper");

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminSchema = new Schema(
    {
      userName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20,
        match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      collection: "user",
      versionKey: false,
    }
  );

  const AdminModel = mongoose.model("User", AdminSchema);

  //默认创建一个管理员
  let adminUser = {
    userName: "admin",
    password: "123456",
  };

  helper.genSaltPassword(adminUser.password).then(async (hash) => {
    adminUser.password = hash;
    const oldUser = await AdminModel.find({ userName: adminUser.userName });
    if (oldUser.length === 0) {
      AdminModel.create(adminUser);
    }
  });

  return AdminModel;
};

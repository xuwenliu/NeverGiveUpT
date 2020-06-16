'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
//   cors: {
//     enable: true,
//     package: 'egg-cors',
//   },
  // bcrypt: {
  //   enable: true,
  //   package: 'egg-bcrypt',
  // },
};

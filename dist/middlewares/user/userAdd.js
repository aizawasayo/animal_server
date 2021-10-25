"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.exec.js");

var _user = require("@/model/user");

var _resInfo = require("@/constant/resInfo");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

//引入用户集合的构造函数
module.exports = async (ctx, next) => {
  const postData = ctx.request.body;

  try {
    // 格式验证
    // 生成随机字符串
    const created_time = Date.parse(new Date()) / 1000;
    const data = Object.assign({
      created_time
    }, postData);
    await (0, _user.validateUser)(data);
    const user = await _user.User.findOne({
      // 查看用户名有无重复
      username: data.username
    }).exec();

    if (user) {
      ctx.body = {
        code: 409,
        message: '用户名已经被占用'
      };
      return;
    }

    if (data.email) {
      // 查询该使用邮箱的用户是否已存在
      const email = await _user.User.findOne({
        email: data.email
      });

      if (email) {
        ctx.body = {
          code: 409,
          message: '邮箱已经被占用'
        };
        return;
      }
    }

    const salt = await _bcrypt.default.genSalt(10);
    data.password = await _bcrypt.default.hash(postData.password, salt);
    await _user.User.create(data);
    ctx.body = _resInfo.addSuccess;
  } catch (err) {
    //验证没有通过
    ctx.body = {
      code: 400,
      message: err.message
    };
  }
};
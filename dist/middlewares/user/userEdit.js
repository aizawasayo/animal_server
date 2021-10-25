"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

var _user = require("@/model/user");

var _resInfo = require("@/constant/resInfo");

//引入用户集合的构造函数
module.exports = async (ctx, next) => {
  const {
    id
  } = ctx.request.params;
  const postData = ctx.request.body; // 根据id查询用户信息

  try {
    const user = await _user.User.findById(id).exec();

    if (!user) {
      ctx.body = {
        code: 400,
        message: '没有查询到对应的用户'
      };
      return;
    }

    delete postData.password;
    delete postData._id;
    await _user.User.findByIdAndUpdate(id, postData);
    ctx.body = _resInfo.editSuccess;
  } catch (err) {
    ctx.body = {
      code: 400,
      message: err.message
    };
  }
};
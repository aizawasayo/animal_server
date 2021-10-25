"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

var _user = require("@/model/user");

var _resInfo = require("@/constant/resInfo");

const bcrypt = require('bcrypt');

module.exports = async (ctx, next) => {
  //接收客户端传递过来的post请求参数
  const {
    oldPsw,
    newPsw
  } = ctx.request.body;
  const {
    id
  } = ctx.request.params;

  try {
    const user = await _user.User.findById(id).exec();
    const isValid = await bcrypt.compare(oldPsw, user.password);

    if (isValid) {
      // 密码比对
      // 生成随机字符串
      const salt = await bcrypt.genSalt(10); // 对密码进行加密处理

      const password = await bcrypt.hash(newPsw, salt);
      await _user.User.findByIdAndUpdate(id, {
        password
      });
    } else {
      // 密码比对失败
      ctx.body = {
        code: 400,
        message: '密码有误！'
      };
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      message: err.message
    };
  }
};
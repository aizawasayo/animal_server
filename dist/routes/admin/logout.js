"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _default = async (ctx, next) => {
  console.log(ctx.session); // delete ctx.session.views

  delete ctx.session.username; //   next()

  ctx.body = {
    code: 200,
    message: '登出成功'
  };
};

exports.default = _default;
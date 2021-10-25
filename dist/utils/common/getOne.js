"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

var _default = async (routerParams, Model, ref) => {
  const {
    ctx,
    next
  } = routerParams;
  const {
    id
  } = ctx.request.params;
  const refKey = ref ? ref : '';

  try {
    // 返回值 doc: Object （没有符合条件的是 null）
    const doc = await Model.findById(id).populate(refKey).exec();
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: doc
    };
  } catch (err) {
    // ctx.body = {
    //   code: 400,
    //   message: '查询失败' + err.message,
    // }
    ctx.app.emit('error', {
      code: 400,
      message: '查询失败' + err.message
    }, ctx);
  }
};

exports.default = _default;
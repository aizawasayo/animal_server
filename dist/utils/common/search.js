"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

// 查询所有符合条件的数据，不分页
var _default = async (routerParams, Model, key) => {
  const {
    ctx,
    next
  } = routerParams;
  const queryKey = key ? key : 'name';
  const queryVal = ctx.query[queryKey].trim();
  const keyReg = new RegExp(queryVal, 'i');

  try {
    // 返回值 docs: Array （没有符合条件的是 []）
    const response = await Model.find({
      [queryKey]: {
        $regex: keyReg
      }
    }).exec();
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: response
    };
  } catch (err) {
    ctx.body = {
      code: 400,
      message: '查询失败' + err.message
    };
  }
};

exports.default = _default;
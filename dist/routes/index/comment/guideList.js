"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.trim.js");

var _guide_comment = _interopRequireDefault(require("@/model/guide_comment"));

var _getList = _interopRequireDefault(require("@/utils/common/getList"));

var _default = async (ctx, next) => {
  const {
    page,
    pageSize,
    query,
    sort,
    aid
  } = ctx.query;
  let condition = {};

  if (query) {
    let contentReg = new RegExp(query.trim(), 'i');
    condition['content'] = contentReg;
  }

  if (aid) condition['aid'] = aid;
  let sortCondition = {
    like: -1
  };
  if (sort) sortCondition = JSON.parse(sort);
  await (0, _getList.default)({
    ctx,
    next,
    page,
    pageSize,
    condition,
    sortCondition,
    Model: _guide_comment.default,
    ref: 'uid'
  });
};

exports.default = _default;
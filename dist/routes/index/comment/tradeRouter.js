"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _trade_comment = _interopRequireDefault(require("@/model/trade_comment"));

var _add = _interopRequireDefault(require("@/utils/common/add"));

var _getOne = _interopRequireDefault(require("@/utils/common/getOne"));

var _delete = _interopRequireDefault(require("@/utils/common/delete"));

var _tradeList = _interopRequireDefault(require("./tradeList"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询交易评论列表路由
router.get('/', _tradeList.default); // 交易评论添加路由

router.post('/', async (ctx, next) => {
  await addData({
    ctx,
    next
  }, _trade_comment.default, {
    key: false,
    addTime: true
  });
}); // 交易评论查询路由

router.get('/:id', async (ctx, next) => {
  await (0, _getOne.default)({
    ctx,
    next
  }, _trade_comment.default);
}); // 删除交易评论

router.delete('/:id', async (ctx, next) => {
  await (0, _delete.default)({
    ctx,
    next
  }, _trade_comment.default);
});
router.name = 'comment/trade';
var _default = router;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _turnip_comment = _interopRequireDefault(require("@/model/turnip_comment"));

var _add = _interopRequireDefault(require("@/utils/common/add"));

var _getOne = _interopRequireDefault(require("@/utils/common/getOne"));

var _delete = _interopRequireDefault(require("@/utils/common/delete"));

var _turnipList = _interopRequireDefault(require("./turnipList"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询菜市场评论列表
router.get('/', _turnipList.default); // 菜市场评论添加路由

router.post('/', async (ctx, next) => {
  await addData({
    ctx,
    next
  }, _turnip_comment.default, {
    key: false,
    addTime: true
  });
}); // 菜市场评论查询路由

router.get('/:id', async (ctx, next) => {
  await (0, _getOne.default)({
    ctx,
    next
  }, _turnip_comment.default);
}); // 删除菜市场评论

router.delete('/:id', async (ctx, next) => {
  await (0, _delete.default)({
    ctx,
    next
  }, _turnip_comment.default);
});
router.name = 'comment/turnip';
var _default = router;
exports.default = _default;
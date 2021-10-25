"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _board_comment = _interopRequireDefault(require("@/model/board_comment"));

var _add = _interopRequireDefault(require("@/utils/common/add"));

var _getOne = _interopRequireDefault(require("@/utils/common/getOne"));

var _delete = _interopRequireDefault(require("@/utils/common/delete"));

var _boardList = _interopRequireDefault(require("./boardList"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询森友墙评论列表
router.get('/', _boardList.default); // 添加森友墙评论路由

router.post('/', async (ctx, next) => {
  await addData({
    ctx,
    next
  }, _board_comment.default, {
    key: false,
    addTime: true
  });
}); // 森友墙评论查询路由

router.get('/:id', async (ctx, next) => {
  await (0, _getOne.default)({
    ctx,
    next
  }, _board_comment.default);
}); // 删除森友墙评论

router.delete('/:id', async (ctx, next) => {
  await (0, _delete.default)({
    ctx,
    next
  }, _board_comment.default);
});
router.name = 'comment/board';
var _default = router;
exports.default = _default;
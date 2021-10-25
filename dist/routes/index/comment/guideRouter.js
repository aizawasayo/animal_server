"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _guide_comment = _interopRequireDefault(require("@/model/guide_comment"));

var _add = _interopRequireDefault(require("@/utils/common/add"));

var _getOne = _interopRequireDefault(require("@/utils/common/getOne"));

var _delete = _interopRequireDefault(require("@/utils/common/delete"));

var _guideList = _interopRequireDefault(require("./guideList"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询攻略评论列表路由
router.get('/', _guideList.default); // 攻略评论添加路由

router.post('/', async (ctx, next) => {
  await addData({
    ctx,
    next
  }, _guide_comment.default, {
    key: false,
    addTime: true
  });
}); // 攻略评论查询路由

router.get('/:id', async (ctx, next) => {
  await (0, _getOne.default)({
    ctx,
    next
  }, _guide_comment.default);
}); // 删除攻略评论

router.delete('/:id', async (ctx, next) => {
  await (0, _delete.default)({
    ctx,
    next
  }, _guide_comment.default);
});
router.name = 'comment/guide';
var _default = router;
exports.default = _default;
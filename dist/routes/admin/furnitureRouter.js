"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getList = _interopRequireDefault(require("@/middlewares/common/getList"));

var _add = _interopRequireDefault(require("@/middlewares/common/add"));

var _getOne = _interopRequireDefault(require("@/middlewares/common/getOne"));

var _delete = _interopRequireDefault(require("@/middlewares/common/delete"));

var _search = _interopRequireDefault(require("@/middlewares/common/search"));

var _furniture = _interopRequireDefault(require("@/model/furniture"));

const Router = require('@koa/router');

const router = new Router();
// 分页列表路由
router.get('/', (0, _getList.default)({
  Model: _furniture.default,
  conditionKeys: ['type', 'channels', 'size', 'remould', 'orderType', 'series', 'character', 'npc']
})); // 实时搜索全部符合条件的家具

router.get('/search', (0, _search.default)({
  Model: _furniture.default
})); // 添加功能路由

router.post('/', (0, _add.default)({
  Model: _furniture.default
})); // 查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _furniture.default
})); // 删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _furniture.default
}));
router.name = 'furniture';
var _default = router;
exports.default = _default;
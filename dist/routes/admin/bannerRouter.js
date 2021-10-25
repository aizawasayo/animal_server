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

var _getAll = _interopRequireDefault(require("@/middlewares/common/getAll"));

var _banner = _interopRequireDefault(require("@/model/banner"));

const Router = require('@koa/router');

const router = new Router();
// 焦点图分页查询列表路由
router.get('/', (0, _getList.default)({
  Model: _banner.default,
  initialQueryKey: 'title',
  conditionKeys: ['state'],
  initialSortKey: 'title'
})); // 获取全部焦点图路由

router.get('/list', (0, _getAll.default)({
  Model: _banner.default,
  conditionKey: 'state',
  initialSortKey: 'title'
})); // 焦点图添加功能路由

router.post('/', (0, _add.default)({
  Model: _banner.default,
  key: ['title'],
  addTime: true,
  uniqueName: '标题'
})); // 焦点图查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _banner.default
})); // 删除焦点图

router.delete('/:id', (0, _delete.default)({
  Model: _banner.default
}));
router.name = 'banner';
var _default = router;
exports.default = _default;
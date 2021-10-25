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

var _search = _interopRequireDefault(require("@/middlewares/common/search"));

var _option = _interopRequireDefault(require("@/model/option"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询选项列表
router.get('/', (0, _getList.default)({
  Model: _option.default,
  conditionKeys: ['type'],
  initialSortKey: 'orderNum'
})); // 获取所有选项

router.get('/list', (0, _getAll.default)({
  Model: _option.default,
  conditionKey: 'type',
  initialSortKey: 'orderNum'
})); // 实时搜索选项名

router.get('/search', (0, _search.default)({
  Model: _option.default
})); // 选项添加功能路由

router.post('/', (0, _add.default)({
  Model: _option.default,
  key: ['name', 'type'],
  addTime: true,
  uniqueName: '选项'
})); // 选项查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _option.default
})); // 选项删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _option.default
}));
router.name = 'option';
var _default = router;
exports.default = _default;
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

var _design = _interopRequireDefault(require("@/model/design"));

const Router = require('@koa/router');

const router = new Router();
// 分页查询列表路由
router.get('/', (0, _getList.default)({
  Model: _design.default,
  conditionKeys: ['type', 'user']
})); // 添加功能路由

router.post('/', (0, _add.default)({
  Model: _design.default,
  addTime: true
})); // 查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _design.default,
  ref: 'user'
})); // 删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _design.default
}));
router.name = 'design';
var _default = router;
exports.default = _default;
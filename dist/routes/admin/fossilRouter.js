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

var _fossil = _interopRequireDefault(require("@/model/fossil"));

const Router = require('@koa/router');

const router = new Router();
// 化石列表路由
router.get('/', (0, _getList.default)({
  Model: _fossil.default
})); // 化石添加功能路由

router.post('/', (0, _add.default)({
  Model: _fossil.default
})); // 化石查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _fossil.default
})); // 化石删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _fossil.default
}));
router.name = 'fossil';
var _default = router;
exports.default = _default;
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

var _islander = _interopRequireDefault(require("@/model/islander"));

const Router = require('@koa/router');

const router = new Router();
// 岛民列表路由
router.get('/', (0, _getList.default)({
  Model: _islander.default,
  conditionKeys: ['sex', 'monthStr', 'birth', 'breed', 'character', 'voice', 'hobby']
})); // 岛民添加功能路由

router.post('/', (0, _add.default)({
  Model: _islander.default
})); // 岛民查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _islander.default
})); // 岛民删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _islander.default
}));
router.name = 'islander';
var _default = router;
exports.default = _default;
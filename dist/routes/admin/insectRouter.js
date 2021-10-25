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

var _insect = _interopRequireDefault(require("@/model/insect"));

const Router = require('@koa/router');

const router = new Router();
// 昆虫列表路由
router.get('/', (0, _getList.default)({
  Model: _insect.default,
  conditionKeys: ['locale', 'rarity', 'unlockCondition', 'weatherCondition']
})); // 昆虫添加功能路由

router.post('/', (0, _add.default)({
  Model: _insect.default
})); // 昆虫查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _insect.default
})); // 昆虫删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _insect.default
}));
router.name = 'insect';
var _default = router;
exports.default = _default;
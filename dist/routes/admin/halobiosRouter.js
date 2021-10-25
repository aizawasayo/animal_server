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

var _halobios = _interopRequireDefault(require("@/model/halobios"));

const Router = require('@koa/router');

const router = new Router();
// 海洋生物列表路由
router.get('/', (0, _getList.default)({
  Model: _halobios.default,
  conditionKeys: ['shadow', 'locale', 'unlockCondition']
})); // 海洋生物添加功能路由

router.post('/', (0, _add.default)({
  Model: _halobios.default
})); // 海洋生物查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _halobios.default
})); // 海洋生物删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _halobios.default
}));
router.name = 'halobios';
var _default = router;
exports.default = _default;
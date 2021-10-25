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

var _auth = _interopRequireDefault(require("@/middlewares/turnip/auth"));

var _turnip = _interopRequireDefault(require("@/model/turnip"));

const Router = require('@koa/router');

const router = new Router();
// 大头菜列表路由
router.get('/', (0, _getList.default)({
  Model: _turnip.default,
  initialQueryKey: 'detail',
  conditionKeys: ['exchangeType', 'user'],
  initialSortKey: 'validTime',
  ref: 'user'
})); // 大头菜添加功能路由

router.post('/', (0, _auth.default)({
  Model: _turnip.default
}), (0, _add.default)({
  Model: _turnip.default,
  key: ['detail'],
  addTime: true,
  uniqueName: '内容'
})); // 大头菜查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _turnip.default,
  ref: 'user'
})); // 大头菜删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _turnip.default
}));
router.name = 'turnip';
var _default = router;
exports.default = _default;
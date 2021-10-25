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

var _trade = _interopRequireDefault(require("@/model/trade"));

const Router = require('@koa/router');

const router = new Router();
// 交易列表路由
router.get('/', (0, _getList.default)({
  Model: _trade.default,
  initialQueryKey: 'detail',
  conditionKeys: ['exchangeType', 'user'],
  initialSortKey: 'validTime',
  ref: 'user'
})); // 交易添加功能路由

router.post('/', (0, _add.default)({
  Model: _trade.default,
  key: ['detail'],
  addTime: true,
  uniqueName: '内容'
})); // 交易查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _trade.default,
  ref: 'user'
})); // 交易删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _trade.default
}));
router.name = 'trade';
var _default = router;
exports.default = _default;
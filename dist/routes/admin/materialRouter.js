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

var _material = _interopRequireDefault(require("@/model/material"));

const Router = require('@koa/router');

const router = new Router();
// 素材列表路由
router.get('/', (0, _getList.default)({
  Model: _material.default,
  conditionKeys: ['channels', 'season', 'activity']
})); //实时搜索材料名

router.get('/search', (0, _search.default)({
  Model: _material.default
})); // 素材添加功能路由

router.post('/', (0, _add.default)({
  Model: _material.default
})); // 素材查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _material.default
})); // 素材删除功能路由

router.delete('/:id', (0, _delete.default)({
  Model: _material.default
}));
router.name = 'material';
var _default = router;
exports.default = _default;
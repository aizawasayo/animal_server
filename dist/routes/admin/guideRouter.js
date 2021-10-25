"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _getList = _interopRequireDefault(require("@/middlewares/common/getList"));

var _add = _interopRequireDefault(require("@/middlewares/common/add"));

var _getOne = _interopRequireDefault(require("@/middlewares/common/getOne"));

var _delete = _interopRequireDefault(require("@/middlewares/common/delete"));

var _guide = _interopRequireDefault(require("@/model/guide"));

const Router = require('@koa/router');

const router = new Router();
// 攻略列表路由
router.get('/', (0, _getList.default)({
  Model: _guide.default,
  initialQueryKey: 'title',
  conditionKeys: ['comment_disabled', 'status'],
  initialSortKey: 'created_time',
  ref: 'author'
})); // 攻略添加功能路由

router.post('/', (0, _add.default)({
  Model: _guide.default,
  process: data => {
    const processedData = Object.assign({}, data);
    if (data.author) processedData.author = processedData._id;
    return processedData;
  },
  key: ['title'],
  addTime: true,
  uniqueName: '标题'
})); // 攻略查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _guide.default,
  ref: 'author'
})); // 删除攻略

router.delete('/:id', (0, _delete.default)({
  Model: _guide.default
}));
router.name = 'guide';
var _default = router;
exports.default = _default;
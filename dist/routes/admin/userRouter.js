"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getList = _interopRequireDefault(require("@/middlewares/common/getList"));

var _getOne = _interopRequireDefault(require("@/middlewares/common/getOne"));

var _delete = _interopRequireDefault(require("@/middlewares/common/delete"));

var _search = _interopRequireDefault(require("@/middlewares/common/search"));

var _userAdd = _interopRequireDefault(require("@/middlewares/user/userAdd"));

var _userEdit = _interopRequireDefault(require("@/middlewares/user/userEdit"));

var _pswModify = _interopRequireDefault(require("@/middlewares/user/pswModify"));

var _user = require("@/model/user");

const Router = require('@koa/router');

const router = new Router();
// 用户列表路由
router.get('/', (0, _getList.default)({
  Model: _user.User,
  initialQueryKey: ['username', 'nickname'],
  conditionKeys: ['position', 'roles', 'state'],
  initialSortKey: 'username'
})); // 实时搜索用户名字

router.get('/search', (0, _search.default)({
  Model: _user.User,
  key: 'username'
})); // 用户添加功能路由

router.post('/', _userAdd.default); // 用户修改功能路由

router.put('/:id', _userEdit.default); // 用户查询功能路由

router.get('/:id', (0, _getOne.default)({
  Model: _user.User
})); // 删除用户信息

router.delete('/:id', (0, _delete.default)({
  Model: _user.User
})); // 用户修改密码路由

router.put('/psw/:id', _pswModify.default);
router.name = 'user';
var _default = router;
exports.default = _default;
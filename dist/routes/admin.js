"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _login = _interopRequireDefault(require("@/routes/admin/login"));

var _logout = _interopRequireDefault(require("@/routes/admin/logout"));

var _utils = require("@/utils");

var _uploadSingle = _interopRequireDefault(require("@/middlewares/upload/uploadSingle"));

var _uploadMulti = _interopRequireDefault(require("@/middlewares/upload/uploadMulti"));

const Router = require('@koa/router');

const koaBody = require('koa-body');

const adminRouter = new Router({
  prefix: '/admin'
});
(0, _utils.registerRouter)(__dirname + '/admin', adminRouter);
adminRouter.get('/setCookie', (ctx, next) => {
  ctx.cookies.set('testCookie', 'dl', {
    path: '/',
    // cookie 的路径
    httpOnly: true,
    // cookie 是否仅通过 HTTP(S) 发送
    maxAge: 24 * 60 * 60 * 1000
  });
});
adminRouter.get('/getCookie', (ctx, next) => {
  console.log(ctx.cookies.get('testCookie'));
}); // 提供用户头像上传服务, 单独上传
// adminRouter.post('/single/upload', uploadUrl.single('avatar'), upload)

adminRouter.post('/single/upload', koaBody({
  multipart: true,
  // 是否解析 FormData 形式的表单数据 即处理 Content-Type 为 multipart/formdate 的请求，上传文件必须为 true
  encoding: 'gzip',
  // 定义表单字段de的编码格式，默认 utf-8
  formidable: {
    uploadDir: _path.default.join(process.cwd(), 'public/uploads/'),
    // 设置文件上传目录
    keepExtensions: true,
    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024,
    //  限制请求体所有字段(不包括上传文件)的内容大小
    multiples: false,
    //  是否支持多文件上传
    onFileBegin: (name, file) => {// 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    }
  }
}), (0, _uploadSingle.default)('avatar')); // 提供批量上传服务

adminRouter.post('/upload', koaBody({
  multipart: true,
  // 是否解析 FormData 形式的表单数据 即处理 Content-Type 为 multipart/formdate 的请求，上传文件必须为 true
  encoding: 'gzip',
  // 定义表单字段de的编码格式，默认 utf-8
  formidable: {
    uploadDir: _path.default.join(process.cwd(), 'public/uploads/'),
    // 设置文件上传目录
    keepExtensions: true,
    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024,
    //  限制请求体所有字段(不包括上传文件)的内容大小
    multiples: true //  是否支持多文件上传

  }
}), (0, _uploadMulti.default)('photoSrc'));
adminRouter.get('/', async (ctx, next) => {
  ctx.body = 'respond with a resource';
  await next();
}); // 实现登陆功能

adminRouter.post('/login', _login.default); // 用户登出

adminRouter.post('/logout', _logout.default);
var _default = adminRouter;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/web.dom-collections.iterator.js");

var _errHandler = _interopRequireDefault(require("@/utils/errHandler.js"));

var _admin = _interopRequireDefault(require("@/routes/admin"));

var _index = _interopRequireDefault(require("@/routes/index"));

const path = require('path');

const Koa = require('koa');

const serve = require('koa-static');

const logger = require('koa-logger');

const onerror = require('koa-onerror');

const koaBody = require('koa-body');

const session = require('koa-session');

const MongooseStore = require('koa-session-mongoose');

const config = require('config');

const mongoose = require('mongoose');

const catchError = require('@/middlewares/catchError');

const app = new Koa();
/* koa 是洋葱模型
  一个请求匹配到的所有中间件，从【第一个】开始执行，一旦执行到 await next() 的时候就会暂停，进入到下一个匹配的中间件；
  到【最后一个】再回过头来倒着处理每个中间件 await 后面的程序，直到执行到【第一个】中间件。
*/
// 需要捕获所有服务端实例的错误

onerror(app); // 所以我们的错误捕获中间件要放在最前面，这一点和 express 非常不同

app.use(catchError);
mongoose.connect("mongodb://".concat(config.get('db.user'), ":").concat(config.get('db.pwd'), "@").concat(config.get('db.host'), ":").concat(config.get('db.port'), "/").concat(config.get('db.name'))).catch(err => console.log(err, '数据库连接成功'));
app.keys = ['aaiizzaawwaassaayyoo'];
app.use(session({
  key: 'koa.animal',
  maxAge: 24 * 60 * 60 * 1000,
  store: new MongooseStore()
}, app)); // 静态资源服务中间件

app.use(serve(path.join(process.cwd(), 'public'))); // 记录日志中间件

app.use(logger()); // 处理 post 请求参数的中间件

app.use(koaBody()); // app.use(async (ctx, next) => {
//   if (ctx.path === '/favicon.ico') return
//   console.log(ctx.session)
//   let n = ctx.session.views || 0
//   ctx.session.views = ++n
//   next()
// })
// 注册管理后台路由中间件

app.use(_admin.default.routes()).use(_admin.default.allowedMethods()); // 注册前台路由中间件

app.use(_index.default.routes()); // 错误捕获

app.on('error', _errHandler.default);
app.listen(3003, err => {
  if (err) throw err;
  console.log('runing at 3003');
});
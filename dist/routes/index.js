"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _utils = require("@/utils");

const Router = require('@koa/router');

const indexRouter = new Router();

/* GET home page. */
indexRouter.get('/', async (ctx, next) => {
  ctx.body = 'haha index';
  await next();
});
(0, _utils.registerRouter)(__dirname + '/index', indexRouter); // getDirNames(__dirname + '/index/comment').forEach(file => {
//   // const router = require(`./index/${file}/${file}Router`).default
//   // adminRouter.use('/' + file, router.routes(), router.allowedMethods())
//   const router = require(`./index/comment/${file.fullName}`).default
//   indexRouter.use(
//     '/common/' + file.keyName,
//     router.routes(),
//     router.allowedMethods()
//   )
// })
// import tradeRouter from './comment/tradeRouter'
// indexRouter.use(
//   '/comment/trade',
//   tradeRouter.routes(),
//   tradeRouter.allowedMethods()
// )

var _default = indexRouter;
exports.default = _default;
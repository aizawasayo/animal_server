"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

function errorHandler(err, ctx) {
  console.log(err);
  console.error('出错了', err.message);
  ctx.status = err.code || 400;
  ctx.body = err;
}
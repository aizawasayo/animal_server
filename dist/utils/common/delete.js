"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _resInfo = require("@/constant/resInfo");

var _default = async (routerParams, Model) => {
  const {
    ctx,
    next
  } = routerParams;
  let {
    id
  } = ctx.request.params;

  if (id.indexOf(',') > 0) {
    // 批量删除
    id = id.split(',');

    try {
      const response = await Model.deleteMany({
        _id: {
          $in: id
        }
      }).exec();

      if (response.deletedCount) {
        ctx.body = _resInfo.multideleteSuccess;
      } else {
        ctx.body = _resInfo.deleteFailed;
      }
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const response = await Model.deleteOne({
        _id: {
          $in: id
        }
      }).exec();
      console.log(response);

      if (response.deletedCount) {
        ctx.body = _resInfo.deleteSuccess;
      } else {
        ctx.body = _resInfo.deleteFailed;
      }
    } catch (err) {
      ctx.app.emit('error', {
        code: 400,
        message: err.message
      }, ctx);
    }
  }
};

exports.default = _default;
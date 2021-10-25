"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.sort.js");

// 分页查询
var _default = async props => {
  const {
    ctx,
    next,
    page,
    pageSize,
    condition,
    sortCondition,
    Model,
    ref
  } = props;
  const limit = parseInt(pageSize);
  const skip = (page - 1) * limit;
  const refKey = ref ? ref : '';

  try {
    const total = await Model.countDocuments(condition).exec();
    const message = total ? '列表查询成功' : '未查询到符合条件的数据'; // 返回值 docs: Array （没有符合条件的是 []）

    const list = await Model.find(condition).skip(skip).limit(limit).populate(refKey).sort(sortCondition).collation({
      locale: 'zh'
    }).exec();
    ctx.body = {
      code: 200,
      message,
      data: {
        list,
        total
      }
    };
  } catch (err) {
    ctx.body = {
      code: 400,
      message: '列表查询失败' + err.message
    };
  }
};

exports.default = _default;
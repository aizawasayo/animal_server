"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

var _resInfo = require("@/constant/resInfo");

// 通用款：没太多特殊需求的新增 / 修改

/**
 * routerParams: Object {ctx, next} 路由中间件回调函数的固定参数
 * Model 表模型名
 * props: Object 其它参数
 *  - key: Array, 新增数据不能重复值的键名数组，默认是['name'] / 若值为nonUnique则表示无需查重
 *  - addTime: Boolean, 是否添加创建时间
 *  - uniqueName: String, 查重处理返回的重复字段名称
 */
var _default = async (routerParams, Model, props) => {
  const {
    ctx,
    next
  } = routerParams;
  const postData = ctx.request.body;
  const options = props ? props : {};
  const {
    key,
    addTime,
    uniqueName
  } = options;
  const uniqueKey = !key ? key === false ? false : ['name'] : key;
  const uniqueText = uniqueName ? uniqueName : '名称';

  const addItem = async () => {
    if (addTime) postData.created_time = Date.parse(new Date()) / 1000;

    try {
      // 返回值 docs : Array|Object （返回成功创建的数据文档/文档数组）
      await Model.create(postData);
      ctx.body = _resInfo.addSuccess;
    } catch (err) {
      ctx.body = {
        code: 400,
        message: '添加失败' + err.message
      };
    }
  };

  if (postData._id) {
    // 修改数据
    try {
      // 返回值： doc: Object 默认是更新之前的文档，如果在options传了new: true，则是更新之后的文档。没查到匹配的则是null
      const res = await Model.findByIdAndUpdate(postData._id, postData).exec();
      console.log(_resInfo.editSuccess);
      ctx.body = _resInfo.editSuccess;
    } catch (err) {
      ctx.body = {
        code: 400,
        message: err
      };
    }
  } else {
    // 新增数据
    if (uniqueKey) {
      // 查重处理
      let condition = {};
      uniqueKey.forEach(item => condition[item] = postData[item]);
      const doc = await Model.findOne(condition);

      if (doc) {
        ctx.body = {
          code: 409,
          message: "\u8BE5".concat(uniqueText, "\u5DF2\u5B58\u5728\uFF0C\u8BF7\u52FF\u91CD\u590D\u6DFB\u52A0")
        };
      } else {
        await addItem();
      }
    } else {
      await addItem();
    }
  }
};

exports.default = _default;
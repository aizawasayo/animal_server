"use strict";

const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 1,
    required: [true, '配置选项名称不能为空']
  },
  type: {
    type: String,
    required: [true, '配置类型不能为空']
  },
  orderNum: Number,
  position: Array,
  // 地理位置，部分配置项(如活动)专用
  duration: String,
  // 存在时期 部分配置项(如活动)专用
  icon: String,
  // 专属图标 部分配置项(如话题)专用
  color: String // 专属颜色 部分配置项(如话题)专用

});
const Option = mongoose.model('Option', optionSchema);
module.exports = Option;
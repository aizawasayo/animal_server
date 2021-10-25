"use strict";

const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 24,
    minlength: 1,
    required: [true, '家具名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  type: {
    type: Array,
    required: [true, '用户id不能为空']
  },
  remould: String,
  // 能否改造
  orderType: String,
  // 订购类型
  size: String,
  // 大小，占地面积
  series: String,
  // 所属系列
  channels: Array,
  // 获取途径
  activity: String,
  channelDetail: String,
  // 获取途径详情
  photoSrc: Array
});
const Furniture = mongoose.model('Furniture', furnitureSchema);
module.exports = Furniture;
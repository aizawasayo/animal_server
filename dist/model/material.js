"use strict";

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 1,
    required: [true, '素材名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  activity: String,
  // 所属活动
  season: Array,
  // 所属季节
  maxNum: Number,
  // 最大堆叠数量
  channels: Array,
  // 获取途径
  photoSrc: String
});
const Material = mongoose.model('Material', materialSchema);
module.exports = Material;
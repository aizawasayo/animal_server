"use strict";

const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '工具名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  durability: Number,
  // 耐久度
  isDIY: Boolean,
  // 是否可DIY制作
  activity: String,
  channels: Array,
  channelDetail: String,
  // 获取途径详情
  photoSrc: String
});
const Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;
"use strict";

const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 2,
    required: [true, '唱片名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  // 买入价
  salePrice: Number,
  // 售出价格
  channel: Array,
  photoSrc: Array
});
const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
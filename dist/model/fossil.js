"use strict";

const mongoose = require('mongoose');

const fossilSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
    minlength: 2,
    required: [true, '化石名称不能为空']
  },
  engName: String,
  jpnName: String,
  price: Number,
  introduction: String,
  photoSrc: String
});
const Fossil = mongoose.model('Fossil', fossilSchema);
module.exports = Fossil;
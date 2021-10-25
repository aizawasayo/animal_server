"use strict";

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '发布者不能为空']
  },
  topic: String,
  // 话题
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  //内容
  comments: Array,
  // 评论数量，存评论id
  likes: Array,
  // 点赞数量, 存用户id 不可重复
  icon: String,
  // 话题专属图标
  color: String,
  // 话题专属颜色
  photoSrc: Array,
  // 图片
  created_time: {
    // 新增时间
    type: Number,
    maxlength: 10
  }
});
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
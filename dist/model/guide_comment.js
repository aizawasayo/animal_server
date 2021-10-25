"use strict";

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  aid: {
    // 文章id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
    required: [true, '文章id不能为空']
  },
  uid: {
    // 用户id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '用户id不能为空']
  },
  content: {
    type: String,
    required: [true, '评论内容不能为空']
  },
  like: {
    // 点赞数
    type: Number,
    default: 0
  },
  created_time: {
    type: Number,
    maxlength: 10
  }
});
const GuideComment = mongoose.model('Guide_Comment', commentSchema);
module.exports = GuideComment;
const mongoose = require('mongoose')

const designSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '设计名称不能为空']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '发布者不能为空']
  },
  type: { type: String, required: [true, '类型不能为空'] }, // 类型，图案/衣服/帽子
  content: String, // 简介
  photoSrc: Array, // 图片
  comments: Array, // 评论数量，存评论id
  likes: Array, // 点赞数量, 存用户id 不可重复
  created_time: { // 新增时间
    type: Number,
    maxlength: 10
  },
})

const Design = mongoose.model('Design', designSchema)

module.exports = Design
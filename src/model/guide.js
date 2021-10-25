const mongoose = require('mongoose')

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 30,
    minlength: 8,
    required: [true, '文章标题不能为空'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '作者id不能为空']
  },
  type: String, // 分类
  content_short: String,
  content: String, // 文章内容
  status: { // 是否发布，published：已发布 / draft：未发布（草稿）/ deleted：已删除
    type: String,
    default: 'draft'
  },
  display_time: { // 前台展示时间
    type: Number,
    maxlength: 10
  },
  source_uri: String, // 文章外链
  image_uri: String, // 文章图片
  platforms: Array, // 来源平台
  comment_disabled: { // 是否能评论
    type: Boolean,
    default: false
  },
  comments: Array, // 评论数量，存评论id
  likes: Array, // 点赞数量, 存用户id 不可重复
  photoSrc: String, // 主图
  created_time: { // 新增时间
    type: Number,
    maxlength: 10,
  },
})

const Guide = mongoose.model('Guide', guideSchema)

module.exports = Guide
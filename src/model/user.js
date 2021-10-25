const mongoose = require('mongoose')
// 导入bcrypt
const bcrypt = require('bcrypt')

const Joi = require('joi')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: true,
    minlength: 2,
    maxlength: 12,
  },
  email: {
    type: String,
    // unique: true, // 保证邮箱地址不重复 还是靠api处理吧。。
    // required: true
  },
  nickname: {
    // 游戏中的昵称
    type: String,
    // required: true
  },
  gameId: String,
  islandName: String,
  position: String, // 岛屿位置：North 北半球 / South 南半球
  startDate: {
    // 登岛日期
    type: Number,
    maxlength: 10,
  },
  password: {
    type: String,
    required: [true, '密码不能为空'],
  },
  roles: {
    // admin : 超级管理员 / mormal : 普通用户
    type: Array,
    default: ['normal'],
    required: [true, '角色不能为空'],
  },
  state: {
    // 账户启用状态: / 0:启用；1:禁用
    type: Number,
    default: 0,
  },
  signature: {
    type: String,
    maxlength: 60,
  },
  avatar: String,
  created_time: {
    // 新增时间
    type: Number,
    maxlength: 10,
  },
  favorites: Array, // 收藏
})

// 创建集合
const User = mongoose.model('User', userSchema)

async function createUser() {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash('123456', salt)
  const user = await User.create({
    username: 'BlackFire',
    nickname: '啵啵弟',
    islandName: '囡囡大王岛',
    password: pass,
    gameId: 'SW-3286-3822-7865',
    position: 'North',
    roles: ['admin'],
    state: 0,
  })
}
// createUser();

// 验证用户信息
const validateUser = user => {
  // 定义对象的验证规则
  const schema = Joi.object({
    _id: Joi.string().allow(''),
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error('用户名不符合验证规则')),
    email: Joi.string()
      .email()
      .error(new Error('邮箱格式不符合要求'))
      .allow(''),
    password: user._id
      ? Joi.string()
      : Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .required()
          .error(new Error('密码格式不符合要求')),
    nickname: Joi.string().allow(''),
    islandName: Joi.string().allow(''),
    gameId: Joi.string()
      .allow('')
      .max(17)
      .error(new Error('动森ID长度不符合要求')),
    position: Joi.string().allow(''),
    startDate: Joi.number().allow(null),
    avatar: Joi.string().allow(''),
    signature: Joi.string().allow(''),
    roles: Joi.array()
      .items(Joi.string().valid('admin', 'normal'))
      .error(new Error('角色值非法')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法')),
    created_time: Joi.number().allow(null),
    favorites: Joi.array().allow(null),
  })
  return schema.validate(user)
}

// 将用户集合作为模块成员进行导出
module.exports = {
  User,
  validateUser,
}

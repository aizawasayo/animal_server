// 导入用户集合构造函数
import { User } from '../../model/user'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export default async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (username.trim().length == 0 || password.trim().length == 0) {
    return (ctx.body = {
      code: 400,
      message: '请输入用户名或者密码',
    })
  }
  const user = await User.findOne({
    username: username,
  })
  if (user) {
    // 将客户端输入的密码和用户信息中的密码进行比对
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      // 如果密码比对成功
      // 将用户名存储在请求对象中
      ctx.session.username = user.username
      const { _id, username } = user
      const token = jwt.sign({ _id, username }, 'koa.animal_secret', {
        expiresIn: '1d',
      })
      // ctx.status = 200
      ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          user,
          token,
        },
      }
    } else {
      ctx.body = {
        code: 400,
        message: '密码错误',
      }
    }
  } else {
    ctx.body = {
      code: 400,
      message: '用户名错误',
    }
  }
}

// 导入用户集合构造函数
import { User } from '../../model/user'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export default async (ctx, next) => {
  const { username, password } = ctx.request.body

  const user = await User.findOne({
    username,
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
        // expiresIn: 60 * 60, // 数字类型单位是秒
      })
      // ctx.status = 200
      // Set the new style cookie
      // ctx.cookies.set('3pcookie', 'value', { sameSite: 'none', secure: true })
      // And set the same value in the legacy cookie
      // ctx.cookies.set('3pcookie-legacy', 'value', { secure: true })

      ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          user,
          token,
        },
      }
    } else {
      throw errs.ParameterException('密码错误！')
    }
  } else {
    throw errs.ParameterException('用户名错误！')
  }
}

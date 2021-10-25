//引入用户集合的构造函数
import { User, validateUser } from '@/model/user'
import { addSuccess } from '@/constant/resInfo'
import bcrypt from 'bcrypt'

module.exports = async (ctx, next) => {
  const postData = ctx.request.body

  try {
    // 格式验证
    // 生成随机字符串
    const created_time = Date.parse(new Date()) / 1000
    const data = Object.assign({ created_time }, postData)
    await validateUser(data)
    const user = await User.findOne({
      // 查看用户名有无重复
      username: data.username,
    }).exec()
    if (user) {
      ctx.body = {
        code: 409,
        message: '用户名已经被占用',
      }
      return
    }
    if (data.email) {
      // 查询该使用邮箱的用户是否已存在
      const email = await User.findOne({
        email: data.email,
      })
      if (email) {
        ctx.body = {
          code: 409,
          message: '邮箱已经被占用',
        }
        return
      }
    }
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(postData.password, salt)
    await User.create(data)
    ctx.body = addSuccess
  } catch (err) {
    //验证没有通过
    ctx.body = {
      code: 400,
      message: err.message,
    }
  }
}

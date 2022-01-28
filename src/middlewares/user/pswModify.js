import { User } from '@/model/user'
import { editSuccess } from '@/constant/resInfo'
const bcrypt = require('bcrypt')

module.exports = async (ctx, next) => {
  //接收客户端传递过来的post请求参数
  const { oldPsw, newPsw } = ctx.request.body
  const { id } = ctx.request.params
  try {
    const user = await User.findById(id).exec()

    const match = await bcrypt.compare(oldPsw, user.password)
    if (match) {
      // 密码比对
      // 生成随机字符串
      const salt = await bcrypt.genSalt(10)
      // 对密码进行加密处理
      const password = await bcrypt.hash(newPsw, salt)
      await User.findByIdAndUpdate(id, { password })
      ctx.body = {
        code: 200,
        message: '密码修改成功！',
      }
    } else {
      // 密码比对失败
      throw new errs.ParameterException('原密码有误！')
    }
  } catch (err) {
    ctx.app.emit(
      'error',
      {
        code: 400,
        message: err.message,
      },
      ctx
    )
  }
}

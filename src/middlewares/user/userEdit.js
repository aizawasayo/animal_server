//引入用户集合的构造函数
import { User } from '@/model/user'
import { editSuccess } from '@/constant/resInfo'

module.exports = async (ctx, next) => {
  const { id } = ctx.request.params
  const postData = ctx.request.body
  // 根据id查询用户信息
  try {
    const user = await User.findById(id).exec()
    if (!user) {
      ctx.body = {
        code: 400,
        message: '没有查询到对应的用户',
      }
      return
    }
    delete postData.password
    delete postData._id
    await User.findByIdAndUpdate(id, postData)
    ctx.body = editSuccess
  } catch (err) {
    ctx.body = {
      code: 400,
      message: err.message,
    }
  }
}

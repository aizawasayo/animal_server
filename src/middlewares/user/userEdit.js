//引入用户集合的构造函数
import { User } from '@/model/user'
import { editSuccess } from '@/constant/resInfo'

module.exports = async (ctx, next) => {
  const { id } = ctx.request.params
  const postData = ctx.request.body
  // 根据id查询用户信息
  try {
    delete postData.password
    delete postData._id
    await User.findByIdAndUpdate(id, postData)
    ctx.body = editSuccess
  } catch (err) {
    // throw new errs.HttpException('修改失败')
    next(err)
  }
}

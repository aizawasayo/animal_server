export default props => {
  return async (ctx, next) => {
    const { Model } = props
    const postData = ctx.request.body
    const { _id, user } = postData

    if (!_id) {
      // 新增数据才验证
      const nowTime = Date.parse(new Date()) / 1000
      const doc = await Model.find({
        user,
        validTime: { $gt: nowTime },
      })
      if (doc.length > 0) {
        // 如果该用户已经发布过信息并该条信息未到期
        throw new errs.HttpException('您发布的信息还未到期，请勿重复添加')
      }
      await next()
    } else {
      // 如果是修改，直接去下一个中间件
      await next()
    }
  }
}

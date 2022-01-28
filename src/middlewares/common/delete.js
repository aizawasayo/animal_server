/**
 * props: Object
 *  - Model: 表模型名
 */
import { deleteSuccess, multideleteSuccess } from '@/constant/resInfo'

export default props => {
  return async (ctx, next) => {
    const { Model } = props
    let { id } = ctx.request.params
    if (id.indexOf(',') > 0) {
      // 批量删除
      id = id.split(',')
      try {
        const response = await Model.deleteMany({ _id: { $in: id } }).exec()
        if (response.deletedCount) {
          ctx.body = multideleteSuccess
        } else {
          throw errs.HttpException('删除失败')
        }
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const response = await Model.deleteOne({ _id: { $in: id } }).exec()
        console.log(response)
        if (response.deletedCount) {
          ctx.body = deleteSuccess
        } else {
          throw errs.HttpException('删除失败')
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
  }
}

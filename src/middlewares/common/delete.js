/**
 * props: Object
 *  - Model: 表模型名
 */
import { deleteSuccess, multideleteSuccess } from '@/constant/resInfo'

export default props => {
  return async (ctx, next) => {
    const { Model } = props
    let { id } = ctx.request.params
    const idArr = id.split(',')
    try {
      const response = await Model.deleteMany({ _id: { $in: idArr } }).exec()
      if (response.deletedCount) {
        if (id.indexOf(',') > 0) {
          // 批量删除
          ctx.body = multideleteSuccess
        } else {
          ctx.body = deleteSuccess
        }
      } else {
        throw new errs.HttpException('删除失败')
      }
    } catch (err) {
      next(err)
    }
  }
}

import {
  deleteSuccess,
  multideleteSuccess,
  deleteFailed,
} from '@/constant/resInfo'

export default async (routerParams, Model) => {
  const { ctx, next } = routerParams
  let { id } = ctx.request.params
  if (id.indexOf(',') > 0) {
    // 批量删除
    id = id.split(',')
    try {
      const response = await Model.deleteMany({ _id: { $in: id } }).exec()
      if (response.deletedCount) {
        ctx.body = multideleteSuccess
      } else {
        ctx.body = deleteFailed
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
        ctx.body = deleteFailed
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

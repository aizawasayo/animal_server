const path = require('path')
const fs = require('fs')

const imageDir = path.resolve(__dirname, '../../../public')
let imageType = 'photoSrc' // 专门处理单图字段 [‘photoSrc’|'avatar'] <String>

// 修改数据时，判断图片字段是否有删减图片，并且删除服务器上对应图片的中间件
export const removeAvatar = (Model, imgKey) => {
  return async (ctx, next) => {
    const postData = ctx.request.body
    if (imgKey) imageType = imgKey
    if (postData._id) {
      try {
        const doc = await Model.findById(postData._id)

        // 单图类型
        if (doc[imageType] && doc[imageType] !== postData[imageType]) {
          if (fs.existsSync(`${imageDir}${doc[imageType]}`)) {
            fs.unlinkSync(`${imageDir}${doc[imageType]}`)
          }
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
    await next()
  }
}

// 删除数据时，删除服务器上图片字段对应的所有图片的中间件
export const removeAllAvatar = (Model, imgKey) => {
  return async (ctx, next) => {
    if (imgKey) imageType = imgKey
    let { id } = ctx.request.params
    const idArr = id.split(',')
    try {
      const docs = await Model.find({ _id: { $in: idArr } })

      docs.forEach(doc => {
        if (doc[imageType]) {
          if (fs.existsSync(`${imageDir}${doc[imageType]}`)) {
            fs.unlinkSync(`${imageDir}${doc[imageType]}`)
          }
        }
      })
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

    await next()
  }
}

const path = require('path')
const fs = require('fs')

const imageDir = path.resolve(__dirname, '../../../public')
const imageType = 'photoSrc' // 专门处理多图字段 ['photoSrc'] <Array>

// 修改数据时，判断图片字段是否有删减图片，并且删除服务器上对应图片的中间件
export const removeImage = Model => {
  return async (ctx, next) => {
    const postData = ctx.request.body
    if (postData._id) {
      try {
        const doc = await Model.findById(postData._id)

        const newImgList = []
        postData[imageType].forEach(img => {
          if (typeof img === 'string') {
            newImgList.push(img)
          } else {
            newImgList.push(img.src)
          }
        })

        doc[imageType].forEach(img => {
          if (typeof img === 'string') {
            if (
              !newImgList.includes(img) &&
              fs.existsSync(`${imageDir}${img}`)
            ) {
              fs.unlinkSync(`${imageDir}${img}`)
            }
          } else {
            if (
              !newImgList.includes(img.src) &&
              fs.existsSync(`${imageDir}${img.src}`)
            ) {
              fs.unlinkSync(`${imageDir}${img.src}`)
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
    }
    await next()
  }
}

// 删除数据时，删除服务器上图片字段对应的所有图片的中间件
export const removeAllImage = Model => {
  return async (ctx, next) => {
    let { id } = ctx.request.params
    const idArr = id.split(',')
    try {
      const docs = await Model.find({ _id: { $in: idArr } })
      docs.forEach(doc => {
        doc[imageType].forEach(img => {
          if (typeof img === 'string') {
            if (fs.existsSync(`${imageDir}${img}`)) {
              fs.unlinkSync(`${imageDir}${[img]}`)
            }
          } else {
            if (fs.existsSync(`${imageDir}${img.src}`)) {
              fs.unlinkSync(`${imageDir}${img.src}`)
            }
          }
        })
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

const processFile = file => {
  const { size, path: filePath, name: fileName } = file

  const targetName =
    fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName
  const targetPath = filePath.substring(
    filePath.indexOf('/uploads/'),
    filePath.length
  )
  return {
    name: targetName,
    path: targetPath,
    url: 'http://106.54.168.208:1016' + targetPath,
  }
}
export default fieldname => {
  return async (ctx, next) => {
    const files = ctx.request.files[fieldname]

    let fileInfos = []
    if (Array.isArray(files)) {
      for (var i in files) {
        fileInfos.push(processFile(files[i]))
      }
    } else {
      fileInfos.push(processFile(files))
    }

    // 设置响应类型及编码
    ctx.set({
      'content-type': 'application/json; charset=utf-8',
    })
    ctx.body = {
      code: 200,
      data: fileInfos,
      message: '上传成功',
    }
  }
}

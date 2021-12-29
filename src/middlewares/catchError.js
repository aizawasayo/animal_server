const catchError = async (ctx, next) => {
  try {
    await next()
    // if (ctx.status === 404) {
    //   throw new errs.NotFound()
    // }
  } catch (err) {
    console.log('catch', err)
    if (err.errorCode) {
      ctx.status = err.status || 500
      ctx.body = {
        code: err.code,
        message: err.message,
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
    } else {
      ctx.app.emit('error', err, ctx)
    }
  }
}
module.exports = catchError

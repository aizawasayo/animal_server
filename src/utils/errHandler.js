export default function errorHandler(err, ctx) {
  console.log(err)
  console.error('出错了', err.message)
  ctx.status = err.code || 400
  ctx.body = err
}

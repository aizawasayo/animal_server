export default async (ctx, next) => {
  console.log(ctx.session)
  // delete ctx.session.views
  delete ctx.session.username
  //   next()
  ctx.body = {
    code: 200,
    message: '登出成功',
  }
}

export default async (ctx, next) => {
  // console.log(ctx.session)
  delete ctx.session.username
  //   next()
  ctx.body = {
    code: 200,
    message: 'η»εΊζε',
  }
}

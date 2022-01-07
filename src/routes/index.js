const Router = require('@koa/router')
const indexRouter = new Router()

import { registerRouter } from '@/utils'

/* GET home page. */
indexRouter.get('/', async (ctx, next) => {
  ctx.body = 'haha index'
  await next()
})

registerRouter(__dirname + '/index/comment', indexRouter)

// getDirNames(__dirname + '/index/comment').forEach(file => {
//   // const router = require(`./index/${file}/${file}Router`).default
//   // adminRouter.use('/' + file, router.routes(), router.allowedMethods())
//   const router = require(`./index/comment/${file.fullName}`).default
//   indexRouter.use(
//     '/common/' + file.keyName,
//     router.routes(),
//     router.allowedMethods()
//   )
// })

// import tradeRouter from './comment/tradeRouter'
// indexRouter.use(
//   '/comment/trade',
//   tradeRouter.routes(),
//   tradeRouter.allowedMethods()
// )

export default indexRouter

const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-logger')
// const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const session = require('koa-session')
const MongooseStore = require('koa-session-mongoose')
const config = require('config')
const mongoose = require('mongoose')
const catchError = require('@/middlewares/catchError')

import errorHandler from '@/utils/errHandler.js'
import adminRouter from '@/routes/admin'
import indexRouter from '@/routes/index'

// 全局定义一些异常类型，方便针对性抛出
const errors = require('@/constant/http-exception')
global.errs = errors

const app = new Koa()

/* koa 是洋葱模型
  一个请求匹配到的所有中间件，从【第一个】开始执行，一旦执行到 await next() 的时候就会暂停，进入到下一个匹配的中间件；
  到【最后一个】再回过头来倒着处理每个中间件 await 后面的程序，直到执行到【第一个】中间件。
*/
// 需要捕获所有服务端实例的错误，优化错误信息
// onerror(app)
// 错误捕获中间件 await next() 后的内容会在最后执行，所以我们要把它放在最前面，这一点和 express 非常不同
app.use(catchError)

mongoose
  .connect(
    `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get(
      'db.host'
    )}:${config.get('db.port')}/${config.get('db.name')}`
  )
  .catch(err => {
    console.log(err)
    throw new errs.HttpException('数据库连接失败')
  })

// 设置签名的 cookie 密钥数组
app.keys = ['aaiizzaawwaassaayyoo']
app.use(
  session(
    {
      key: 'koa.animal',
      maxAge: 24 * 60 * 60 * 1000,
      store: new MongooseStore(),
    },
    app
  )
)

// 静态资源服务中间件
app.use(serve(path.join(process.cwd(), 'public')))

// 记录日志中间件
app.use(logger())

// 处理 post 请求参数的中间件
app.use(koaBody())

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return
  // console.log(ctx.session)
  // let n = ctx.session.views || 0
  // ctx.session.views = ++n

  await next()
})

// 注册管理后台路由中间件
app.use(adminRouter.routes()).use(adminRouter.allowedMethods())
// 注册前台路由中间件
app.use(indexRouter.routes())

// 错误捕获
app.on('error', errorHandler)

app.listen(3003, err => {
  if (err) throw err
  console.log('runing at 3003')
})

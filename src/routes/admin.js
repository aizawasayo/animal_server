import path from 'path'
const Router = require('@koa/router')
const koaBody = require('koa-body')

const adminRouter = new Router({ prefix: '/admin' })

import login from '@/routes/admin/login'
import logout from '@/routes/admin/logout'

import { registerRouter } from '@/utils'
import uploadSingle from '@/middlewares/upload/uploadSingle'
import uploadMulti from '@/middlewares/upload/uploadMulti'

registerRouter(__dirname + '/admin', adminRouter)

adminRouter.get('/setCookie', (ctx, next) => {
  ctx.cookies.set('testCookie', 'dl', {
    path: '/', // cookie 的路径
    httpOnly: true, // cookie 是否仅通过 HTTP(S) 发送
    maxAge: 24 * 60 * 60 * 1000,
  })
})

adminRouter.get('/getCookie', (ctx, next) => {
  console.log(ctx.cookies.get('testCookie'))
})

// 提供用户头像上传服务, 单独上传
// adminRouter.post('/single/upload', uploadUrl.single('avatar'), upload)
adminRouter.post(
  '/single/upload',
  koaBody({
    multipart: true, // 是否解析 FormData 形式的表单数据 即处理 Content-Type 为 multipart/formdate 的请求，上传文件必须为 true
    encoding: 'gzip', // 定义表单字段de的编码格式，默认 utf-8
    formidable: {
      uploadDir: path.join(process.cwd(), 'public/uploads/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, //  限制请求体所有字段(不包括上传文件)的内容大小
      multiples: false, //  是否支持多文件上传
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    },
  }),
  uploadSingle('avatar')
)

// 提供批量上传服务
adminRouter.post(
  '/upload',
  koaBody({
    multipart: true, // 是否解析 FormData 形式的表单数据 即处理 Content-Type 为 multipart/formdate 的请求，上传文件必须为 true
    encoding: 'gzip', // 定义表单字段de的编码格式，默认 utf-8
    formidable: {
      uploadDir: path.join(process.cwd(), 'public/uploads/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, //  限制请求体所有字段(不包括上传文件)的内容大小
      multiples: true, //  是否支持多文件上传
    },
  }),
  uploadMulti('photoSrc')
)

adminRouter.get('/', async (ctx, next) => {
  ctx.body = 'respond with a resource'
  await next()
})

// 实现登陆功能
adminRouter.post('/login', login)

// 用户登出
adminRouter.post('/logout', logout)

export default adminRouter

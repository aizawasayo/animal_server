const jwt = require('jsonwebtoken')

// 需要登录权限的路由都要经过这个中间件
const auth = async (ctx, next) => {
  const token = ctx.header.authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, 'koa.animal_secret')
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        // ctx.app.emit('error', tokenExpiredError, ctx)
        throw new errs.AuthFailed('token已过期', 10101)
      case 'JsonWebTokenError':
        throw new errs.AuthFailed('无效的token', 10102)
      default:
        throw new errs.AuthFailed()
    }
  }
  await next()
}

module.exports = auth
// jwt.sign(payload, secretOrPrivateKey, [options, callback])

// - payload：一般用一个对象字面量。内容为用户信息的js对象；
// - secretOrPrivateKey：用来生成 token 的key值
// - options： 配置项

// expiresIn, notBefore, audience, subject, issuer 没有默认值。
// 这些配置项也可以用 exp、nbf、aud、sub 和 iss 直接在第一个参数对象中提供
// 但不能同时在出现在这两个位置

// const token = jwt.sign({
//   // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 从 1970-01-01T00:00:00Z UTC 以来的秒数
//   // nbf: ,
// }, {
//   // algorithm : HS256, // 签名的算法，默认是 HMAC SHA256
//   // expiresIn: 60 * 60, // 有效时间。 number，字符串数字的话单位会被解析成 ms。这里表示 1小时，也可以用 '1h'
//   // notBefore: , // 生效时间
//   // audience: , // 受众
//   // issuer: , // 签发人
//   // jwtid: , // 编号
//   // subject: ,
//   // noTimestamp: ,
//   // header: ,
//   // keyid: ,
//   // mutatePayload: ,
// })

// const md5 = require('blueimp-md5')
// const moment = require('moment')
// const Base64 = require('js-base64').Base64
import md5 from 'blueimp-md5'
import moment from 'moment'
import { Base64 } from 'js-base64'
import got from 'got'

/* 生成指定长度的随机数 */
function randomCode(length) {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let result = ''
  for (let i = 0; i < length; i++) {
    const index = Math.ceil(Math.random() * 9)
    result += chars[index]
  }
  return result
}

/* 向指定号码发送指定验证码 */
const sendCode = async (phone, code, ctx) => {
  const ACCOUNT_SID = '8aaf070881ad8ad40181f0fdf5f70f9b'
  const AUTH_TOKEN = '8e78af68025d4db49429bfdf40cc0885'
  const Rest_URL = 'https://app.cloopen.com:8883'
  const AppID = '8aaf070881ad8ad40181f0fdf6ec0fa2'

  // 1. 准备请求 url
  /*
   1). 使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
   时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
   2). SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
   */
  let sigParameter = ''
  const time = moment().format('YYYYMMDDHHmmss')
  sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time)
  const url = `${Rest_URL}/2013-12-26/Accounts/${ACCOUNT_SID}/SMS/TemplateSMS?sig=${sigParameter}`

  // 2. 准备请求体
  let body = {
    to: phone,
    appId: AppID,
    templateId: '1', // 测试模板id是1
    datas: [code, '1'],
  }
  // body = JSON.stringify(body)
  // 3. 准备请求头
  /*
    1). 使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
    2). 冒号为英文冒号
    3). 时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
  const authorization = Base64.encode(ACCOUNT_SID + ':' + time)
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json;charset=utf-8',
    // 'Content-Length': JSON.stringify(body).length + '',
    Authorization: authorization,
  }

  // 4. 发送请求, 并得到返回的结果

  try {
    const response = await got
      .post(url, {
        headers: headers,
        json: body,
      })
      .json()

    // console.log('statusCode:', response.statusCode)
    // console.log('body:', response.body)
    if (response.statusCode === '000000') {
      ctx.body = {
        code: 200,
        message: '发送成功！',
      }
    } else {
      ctx.body = { code: 500, message: body.statusMsg }
    }
  } catch (error) {
    // console.log('error:', error)
    throw new errs.ParameterException(error.message)
  }
}

export default async (ctx, next) => {
  // 随机生成 6位 验证码
  const code = randomCode(6)
  await sendCode(ctx.request.body.phone, code, ctx)
}

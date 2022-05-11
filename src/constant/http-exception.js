//http-exception.js

class HttpException extends Error {
  constructor(message = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode || 10000
    this.code = code || 400
    this.message = message || '服务器异常'
    this.status = 400
  }
}

class ParameterException extends HttpException {
  constructor(message, errorCode) {
    super()
    this.errorCode = errorCode || 10000
    this.code = 400
    this.message = message || '参数错误'
    this.status = 400
  }
}

class NotFound extends HttpException {
  constructor(message, errorCode) {
    super()
    this.errorCode = errorCode || 10001
    this.code = 404
    this.message = message || '资源未找到'
    this.status = 404
  }
}

class AuthFailed extends HttpException {
  constructor(message, errorCode) {
    super()
    this.errorCode = errorCode || 10002
    this.code = 401
    this.message = message || '授权失败'
    this.status = 401
  }
}

class Forbidden extends HttpException {
  constructor(message, errorCode) {
    super()
    this.errorCode = errorCode || 10003
    this.code = 403
    this.message = message || '禁止访问'
    this.status = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbidden,
}

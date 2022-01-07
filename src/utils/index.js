const fs = require('fs')
const Router = require('@koa/router')
const requireDirectory = require('require-directory')

function filterRouter(router, parentRouter) {
  const r = router.default
  if (r instanceof Router) {
    parentRouter.use('/' + r.name, r.routes()).use(r.allowedMethods())
  }
}

// requireDirectory方法也支持opitons参数，配置响应的回调函数
export function registerRouter(path, parentRouter) {
  // 参数说明：
  // 第一个：固定参数 module
  // 第二个：是要加载的模块的路径
  // 第三个：每加载一个模块时执行的函数
  requireDirectory(module, path, { visit: r => filterRouter(r, parentRouter) })
}

// 获取需要导入的路有模块的目录名
export function getDirNames(path) {
  const files = fs.readdirSync(path)
  let routerArr = []
  let dirArr = []
  files.forEach(file => {
    if (/Router.js$/.test(file)) {
      const keyName = file.replace('Router.js', '')
      const fullName = file.replace('.js', '')
      routerArr.push({ keyName, fullName })
    }
    if (!/.js$/.test(file) && file !== '.DS_Store') {
      dirArr.push(file)
    }
  })
  dirArr.forEach(dir => {
    // const files = fs.readdirSync(path + '/' + dir)
    getDirNames(path + '/' + dir)
  })
  return routerArr
}

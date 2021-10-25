"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDirNames = getDirNames;
exports.registerRouter = registerRouter;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

const fs = require('fs');

const Router = require('@koa/router');

const requireDirectory = require('require-directory');

function filterRouter(router, parentRouter) {
  const r = router.default;
  if (r instanceof Router) parentRouter.use('/' + r.name, r.routes()).use(r.allowedMethods());
} //requireDirectory方法也支持opitons参数，配置响应的回调函数


function registerRouter(path, parentRouter) {
  requireDirectory(module, path, {
    visit: r => filterRouter(r, parentRouter)
  });
} // 获取需要导入的路有模块的目录名


function getDirNames(path) {
  const files = fs.readdirSync(path);
  let routerArr = [];
  let dirArr = [];
  files.forEach(file => {
    if (/Router.js$/.test(file)) {
      const keyName = file.replace('Router.js', '');
      const fullName = file.replace('.js', '');
      routerArr.push({
        keyName,
        fullName
      });
    }

    if (!/.js$/.test(file) && file !== '.DS_Store') {
      dirArr.push(file);
    }
  });
  dirArr.forEach(dir => {
    // const files = fs.readdirSync(path + '/' + dir)
    getDirNames(path + '/' + dir);
  });
  return routerArr;
}
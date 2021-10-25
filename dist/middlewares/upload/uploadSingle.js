"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _os = _interopRequireDefault(require("os"));

var _fs = _interopRequireDefault(require("fs"));

function uid() {
  return Math.random().toString(36).slice(2);
}

var _default = fieldname => {
  return async (ctx, next) => {
    // 临时目录的 demo
    // const tmpdir = path.join(os.tmpdir(), uid())
    // // make the temporary directory
    // try {
    //   await fs.mkdir(tmpdir, err => {})
    //   const filePaths = []
    //   const files = ctx.request.files || {}
    //   for (let key in files) {
    //     const file = files[key]
    //     const filePath = path.join(tmpdir, file.name)
    //     const reader = fs.createReadStream(file.path)
    //     const writer = fs.createWriteStream(filePath)
    //     reader.pipe(writer)
    //     filePaths.push(filePath)
    //   }
    //   ctx.body = filePaths
    // } catch (err) {
    //   console.log(err)
    // }
    const file = ctx.request.files[fieldname];
    const {
      size,
      path: filePath,
      name: fileName
    } = file;
    const targetName = fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName;
    const targetPath = filePath.substring(filePath.indexOf('/uploads/'), filePath.length);
    ctx.body = {
      code: 200,
      data: {
        name: targetName,
        path: targetPath,
        url: 'http://106.54.168.208:1016' + targetPath
      },
      message: '上传成功'
    };
  };
};

exports.default = _default;
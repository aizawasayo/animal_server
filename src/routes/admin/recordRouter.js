const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'
import { removeImage, removeAllImage } from '@/middlewares/common/removeImage'

import Record from '@/model/record'

// 唱片列表路由
router.get('/', getList({ Model: Record }))

// 唱片添加功能路由
router.post('/', auth, removeImage(Record), addData({ Model: Record }))

// 唱片查询功能路由
router.get('/:id', getById({ Model: Record }))

// 唱片删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllImage(Record),
  deleteById({ Model: Record })
)

router.name = 'record'

export default router

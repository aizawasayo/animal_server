const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'
import { removeImage, removeAllImage } from '@/middlewares/common/removeImage'

import Design from '@/model/design'

// 分页查询列表路由
router.get(
  '/',
  getList({
    Model: Design,
    initialSortKey: 'created_time',
    initialSortVal: -1,
    ref: 'user',
  })
)

// 添加功能路由
router.post(
  '/',
  auth,
  removeImage(Design),
  addData({ Model: Design, addTime: true })
)

// 查询功能路由
router.get('/:id', getById({ Model: Design, ref: 'user' }))

// 删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllImage(Design),
  deleteById({ Model: Design })
)

router.name = 'design'

export default router

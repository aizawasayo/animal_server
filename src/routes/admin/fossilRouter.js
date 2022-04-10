const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import Fossil from '@/model/fossil'

// 化石列表路由
router.get('/', getList({ Model: Fossil }))

// 化石添加功能路由
router.post('/', auth, removeAvatar(Fossil), addData({ Model: Fossil }))

// 化石查询功能路由
router.get('/:id', getById({ Model: Fossil }))

// 化石删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllAvatar(Fossil),
  deleteById({ Model: Fossil })
)

router.name = 'fossil'

export default router

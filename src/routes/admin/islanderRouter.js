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

import Islander from '@/model/islander'

// 岛民列表路由
router.get(
  '/',
  getList({
    Model: Islander,
    conditionKeys: [
      'sex',
      'monthStr',
      'birth',
      'breed',
      'character',
      'voice',
      'hobby',
    ],
  })
)

// 岛民添加功能路由
router.post('/', auth, removeAvatar(Islander), addData({ Model: Islander }))

// 岛民查询功能路由
router.get('/:id', getById({ Model: Islander }))

// 岛民删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllAvatar(Islander),
  deleteById({ Model: Islander })
)

router.name = 'islander'

export default router

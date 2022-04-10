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

import Halobios from '@/model/halobios'

// 海洋生物列表路由
router.get(
  '/',
  getList({
    Model: Halobios,
    conditionKeys: ['shadow', 'locale', 'unlockCondition'],
  })
)
// 海洋生物添加功能路由
router.post('/', auth, removeAvatar(Halobios), addData({ Model: Halobios }))

// 海洋生物查询功能路由
router.get('/:id', getById({ Model: Halobios }))

// 海洋生物删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllAvatar(Halobios),
  deleteById({ Model: Halobios })
)

router.name = 'halobios'

export default router

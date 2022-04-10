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

import Fish from '@/model/fish'

// 鱼类列表路由
router.get(
  '/',
  getList({
    Model: Fish,
    conditionKeys: ['shadow', 'locale', 'rarity', 'unlockCondition'],
  })
)

// 鱼类添加功能路由
router.post('/', auth, removeAvatar(Fish), addData({ Model: Fish }))

// 鱼类查询功能路由
router.get('/:id', getById({ Model: Fish }))

// 鱼类删除功能路由
router.delete('/:id', auth, removeAllAvatar(Fish), deleteById({ Model: Fish }))

router.name = 'fish'

export default router

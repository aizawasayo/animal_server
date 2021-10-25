const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

import Insect from '@/model/insect'

// 昆虫列表路由
router.get(
  '/',
  getList({
    Model: Insect,
    conditionKeys: ['locale', 'rarity', 'unlockCondition', 'weatherCondition'],
  })
)

// 昆虫添加功能路由
router.post('/', addData({ Model: Insect }))

// 昆虫查询功能路由
router.get('/:id', getById({ Model: Insect }))

// 昆虫删除功能路由
router.delete('/:id', deleteById({ Model: Insect }))

router.name = 'insect'

export default router

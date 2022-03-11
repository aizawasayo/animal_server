const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import Recipe from '@/model/recipe'

//配方列表路由
router.get(
  '/',
  getList({
    Model: Recipe,
    conditionKeys: ['type', 'channels', 'size', 'character', 'npc'],
  })
)

// 实时搜索配方名
router.get('/search', searchAll({ Model: Recipe }))

// 配方添加功能路由
router.post('/', removeAvatar(Recipe), addData({ Model: Recipe }))

// 配方查询功能路由
router.get('/:id', getById({ Model: Recipe }))

// 配方删除功能路由
router.delete('/:id', removeAllAvatar(Recipe), deleteById({ Model: Recipe }))

router.name = 'recipe'

export default router

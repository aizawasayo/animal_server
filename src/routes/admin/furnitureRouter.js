const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'

import Furniture from '@/model/furniture'

// 分页列表路由
router.get(
  '/',
  getList({
    Model: Furniture,
    conditionKeys: [
      'type',
      'channels',
      'size',
      'remould',
      'orderType',
      'series',
      'character',
      'npc',
    ],
  })
)

// 实时搜索全部符合条件的家具
router.get('/search', searchAll({ Model: Furniture }))

// 添加功能路由
router.post('/', addData({ Model: Furniture }))

// 查询功能路由
router.get('/:id', getById({ Model: Furniture }))

// 删除功能路由
router.delete('/:id', deleteById({ Model: Furniture }))

router.name = 'furniture'

export default router

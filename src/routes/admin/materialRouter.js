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

import Material from '@/model/material'

// 素材列表路由
router.get(
  '/',
  getList({
    Model: Material,
    conditionKeys: ['channels', 'season', 'activity'],
  })
)

//实时搜索材料名
router.get('/search', searchAll({ Model: Material }))

// 素材添加功能路由
router.post('/', removeAvatar(Material), addData({ Model: Material }))

// 素材查询功能路由
router.get('/:id', getById({ Model: Material }))

// 素材删除功能路由
router.delete(
  '/:id',
  removeAllAvatar(Material),
  deleteById({ Model: Material })
)

router.name = 'material'

export default router

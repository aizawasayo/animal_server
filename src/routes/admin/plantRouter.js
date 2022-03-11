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

import Plant from '@/model/plant'

// 植物列表路由
router.get('/', getList({ Model: Plant, conditionKeys: ['type', 'channel'] }))

// 实时搜索植物名
router.get('/search', searchAll({ Model: Plant }))

// 植物添加功能路由
router.post('/', removeAvatar(Plant), addData({ Model: Plant }))

// 植物查询功能路由
router.get('/:id', getById({ Model: Plant }))

// 植物删除功能路由
router.delete('/:id', removeAllAvatar(Plant), deleteById({ Model: Plant }))

router.name = 'plant'

export default router

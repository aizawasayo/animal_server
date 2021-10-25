const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'

import Tool from '@/model/tool'

// 工具列表路由
router.get(
  '/',
  getList({
    Model: Tool,
    conditionKeys: ['isDIY', 'activity', 'channels'],
  })
)

// 实时搜索工具名
router.get('/search', searchAll({ Model: Tool }))

// 工具添加功能路由
router.post('/', addData({ Model: Tool }))

// 工具查询功能路由
router.get('/:id', getById({ Model: Tool }))

// 工具删除功能路由
router.delete('/:id', deleteById({ Model: Tool }))

router.name = 'tool'

export default router

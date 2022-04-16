const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'
import auth from '@/middlewares/user/auth'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import Tool from '@/model/tool'

// 工具列表路由
router.get('/', getList({ Model: Tool }))

// 实时搜索工具名
router.get('/search', searchAll({ Model: Tool }))

// 工具添加功能路由
router.post('/', auth, removeAvatar(Tool), addData({ Model: Tool }))

// 工具查询功能路由
router.get('/:id', getById({ Model: Tool }))

// 工具删除功能路由
router.delete('/:id', auth, removeAllAvatar(Tool), deleteById({ Model: Tool }))

router.name = 'tool'

export default router

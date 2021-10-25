const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

import Artwork from '@/model/artwork'

// 分页列表路由
router.get('/', getList({ Model: Artwork, conditionKeys: ['hasFake'] }))

// 添加/编辑功能路由
router.post('/', addData({ Model: Artwork }))

// 查询功能路由
router.get('/:id', getById({ Model: Artwork }))

// 删除功能路由
router.delete('/:id', deleteById({ Model: Artwork }))

router.name = 'artwork'

export default router

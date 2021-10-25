const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

import Record from '@/model/record'

// 唱片列表路由
router.get('/', getList({ Model: Record, conditionKeys: ['channel'] }))

// 唱片添加功能路由
router.post('/', addData({ Model: Record }))

// 唱片查询功能路由
router.get('/:id', getById({ Model: Record }))

// 唱片删除功能路由
router.delete('/:id', deleteById({ Model: Record }))

router.name = 'record'

export default router

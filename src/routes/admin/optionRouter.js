const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import getAll from '@/middlewares/common/getAll'
import searchAll from '@/middlewares/common/search'

import Option from '@/model/option'

// 分页查询选项列表
router.get(
  '/',
  getList({
    Model: Option,
    conditionKeys: ['type'],
    initialSortKey: 'orderNum',
  })
)

// 获取所有选项
router.get(
  '/list',
  getAll({ Model: Option, conditionKey: 'type', initialSortKey: 'orderNum' })
)

// 实时搜索选项名
router.get('/search', searchAll({ Model: Option }))

// 选项添加功能路由
router.post(
  '/',
  addData({
    Model: Option,
    key: ['name', 'type'],
    addTime: true,
    uniqueName: '选项',
  })
)

// 选项查询功能路由
router.get('/:id', getById({ Model: Option }))

// 选项删除功能路由
router.delete('/:id', deleteById({ Model: Option }))

router.name = 'option'

export default router

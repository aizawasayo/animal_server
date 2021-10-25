const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

import Trade from '@/model/trade'

// 交易列表路由
router.get(
  '/',
  getList({
    Model: Trade,
    initialQueryKey: 'detail',
    conditionKeys: ['exchangeType', 'user'],
    initialSortKey: 'validTime',
    ref: 'user',
  })
)

// 交易添加功能路由
router.post(
  '/',
  addData({ Model: Trade, key: ['detail'], addTime: true, uniqueName: '内容' })
)

// 交易查询功能路由
router.get('/:id', getById({ Model: Trade, ref: 'user' }))

// 交易删除功能路由
router.delete('/:id', deleteById({ Model: Trade }))

router.name = 'trade'

export default router

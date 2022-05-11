const Router = require('@koa/router')
const router = new Router()

import TradeComment from '@/model/trade_comment'

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'

// 分页查询交易评论列表路由
router.get(
  '/',
  getList({
    Model: TradeComment,
    initialQueryKey: 'content',
    initialSortKey: 'like',
    initialSortVal: -1,
    ref: 'uid',
  })
)

// 交易评论添加路由
router.post(
  '/',
  auth,
  addData({ Model: TradeComment, addTime: true, key: false })
)

// 交易评论查询路由
router.get('/:id', getById({ Model: TradeComment, ref: 'uid' }))

// 删除交易评论
router.delete('/:id', auth, deleteById({ Model: TradeComment }))

router.name = 'comment/trade'

export default router

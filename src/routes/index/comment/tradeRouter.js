const Router = require('@koa/router')
const router = new Router()

import TradeComment from '@/model/trade_comment'

import AddData from '@/utils/common/add'
import getById from '@/utils/common/getOne'
import deleteById from '@/utils/common/delete'
import commentList from './tradeList'

// 分页查询交易评论列表路由
router.get('/', commentList)

// 交易评论添加路由
router.post('/', async (ctx, next) => {
  await addData({ ctx, next }, TradeComment, {
    key: false,
    addTime: true,
  })
})

// 交易评论查询路由
router.get('/:id', async (ctx, next) => {
  await getById({ ctx, next }, TradeComment)
})

// 删除交易评论
router.delete('/:id', async (ctx, next) => {
  await deleteById({ ctx, next }, TradeComment)
})

router.name = 'comment/trade'

export default router

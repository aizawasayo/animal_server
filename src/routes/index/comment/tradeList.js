import TradeComment from '@/model/trade_comment'
import getList from '@/middlewares/common/getList'

export default async (ctx, next) => {
  const { page, pageSize, query, sort, aid } = ctx.query

  let condition = {}
  if (query) {
    const contentReg = new RegExp(query.trim(), 'i')
    condition['content'] = contentReg
  }

  if (aid) condition['aid'] = aid
  let sortCondition = {
    like: -1,
  }
  if (sort) sortCondition = JSON.parse(sort)

  await getList({
    ctx,
    next,
    page,
    pageSize,
    condition,
    sortCondition,
    Model: TradeComment,
    ref: 'uid',
  })
}

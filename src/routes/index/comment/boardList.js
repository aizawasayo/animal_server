import BoardComment from '@/model/board_comment'
import getList from '@/utils/common/getList'

export default async (ctx, next) => {
  const { page, pageSize, query, sort, aid } = ctx.query

  let condition = {}
  if (query) {
    let contentReg = new RegExp(query.trim(), 'i')
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
    Model: BoardComment,
    ref: 'uid',
  })
}

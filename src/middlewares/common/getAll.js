// 查询全部符合条件的数据
/**
 * props: Object
 *  - Model: 表模型名
 *  - conditionKey: String, 匹配条件字段
 *  - initialSortKey: String, 初始排序字段，默认 'name'
 *  - ref: String, 联表查询字段名
 */
export default props => {
  return async (ctx, next) => {
    const { Model, conditionKey, initialSortKey, ref } = props

    const { sort } = ctx.query
    const refKey = ref ? ref : ''

    let condition = {
      [conditionKey]: ctx.query[conditionKey],
    }
    const sortKey = initialSortKey ? initialSortKey : 'name'
    let sortCondition = {
      [sortKey]: 1,
    }

    if (sort) sortCondition = JSON.parse(sort)

    try {
      const data = await Model.find(condition)
        .populate(refKey)
        .sort(sortCondition)
        .collation({
          locale: 'zh',
        })
        .exec()
      ctx.body = {
        code: 200,
        message: '列表获取成功',
        data,
      }
    } catch (err) {
      ctx.app.emit(
        'error',
        {
          code: 400,
          message: err.message,
        },
        ctx
      )
    }
  }
}

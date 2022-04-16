// 分页查询

/**
 * props: Object
 *  - Model: 表模型名
 *  - initialqueryKey: String, 搜索关键字对应字段 默认 'name'
 *  - ❌ conditionKeys: Array, 筛选字段数组（no use，划掉）
 *  - initialSortKey: String, 初始排序字段，默认 'name'
 *  - initialSortVal: Number, 初始排序顺序，默认 1 (正序)
 *  - ref: String, 联表查询字段名
 */
export default props => {
  return async (ctx, next) => {
    const {
      Model,
      initialQueryKey, // 搜索关键字对应字段
      // conditionKeys, // 筛选字段数组
      initialSortKey, // 初始排序字段
      initialSortVal, //初始排序顺序
      ref, // 联表查询字段名
    } = props

    const { page, pageSize, query, sort } = ctx.query
    const limit = parseInt(pageSize)
    const skip = (page - 1) * limit
    const refKey = ref ? ref : ''

    // 查询关键字
    const queryKey = []
    const Reg = new RegExp(query.trim(), 'i')

    if (initialQueryKey) {
      if (Array.isArray(initialQueryKey)) {
        // 数组表示关键字用来匹配多个字段
        initialQueryKey.forEach(key => {
          queryKey.push({
            [key]: Reg,
          })
        })
      } else {
        queryKey.push({
          [initialQueryKey]: Reg,
        })
      }
    } else {
      queryKey.push({
        name: Reg,
      })
    }

    let condition = {
      $or: queryKey, //多条件，数组
    }

    // 其他筛选条件匹配
    let conditionKeys = []
    for (let key in ctx.query) {
      if (!['page', 'pageSize', 'query', 'sort'].includes(key))
        conditionKeys.push(key)
    }

    if (conditionKeys && conditionKeys.length > 0) {
      const filterList = []
      conditionKeys.forEach(key => {
        // 如果传的是数组，请求字段名后会有个 []
        const realKey = key.replace('[]', '')
        let val = ctx.query[key]
        if (val && typeof val === 'string') {
          val = val.split(',')
        }
        filterList.push({ [realKey]: val })
      })

      filterList.forEach(item => {
        if (item) {
          const ckey = Object.keys(item)[0]
          const cVal = Object.values(item)[0]
          if (cVal) {
            condition[ckey] = { $in: cVal }
          }
        }
      })
    }

    // 排序条件
    // 处理初始排序
    const sortKey = initialSortKey ? initialSortKey : 'name'
    const sortVal = initialSortVal ? initialSortVal : 1
    let sortCondition = {
      [sortKey]: sortVal,
    }
    // 如传了排序条件json对象，则按传的来
    if (sort) sortCondition = JSON.parse(sort)

    try {
      const total = await Model.countDocuments(condition).exec()

      const message = total ? '列表查询成功' : '未查询到符合条件的数据'
      // 返回值 docs: Array （没有符合条件的是 []）
      const list = await Model.find(condition)
        .skip(skip)
        .limit(limit)
        .populate(refKey)
        .sort(sortCondition)
        .collation({
          locale: 'zh',
        })
        .exec()

      ctx.body = {
        code: 200,
        message,
        data: {
          list,
          total,
        },
      }
    } catch (err) {
      throw new errs.HttpException('列表查询失败：' + err.message)
    }
  }
}

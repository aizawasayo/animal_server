// 查询所有符合条件的数据，不分页
export default async (routerParams, Model, key) => {
  const { ctx, next } = routerParams
  const queryKey = key ? key : 'name'
  const queryVal = ctx.query[queryKey].trim()
  const keyReg = new RegExp(queryVal, 'i')
  try {
    // 返回值 docs: Array （没有符合条件的是 []）
    const response = await Model.find({
      [queryKey]: {
        $regex: keyReg,
      },
    }).exec()
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: response,
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      message: '查询失败' + err.message,
    }
  }
}

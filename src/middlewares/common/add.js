// 通用款：没太多特殊需求的新增 / 修改
import { addSuccess, editSuccess } from '@/constant/resInfo'
/**
 * props: Object 其它参数
 *  - Model: 表模型名
 *  - key: Array, 新增数据不能重复值的键名数组，默认是['name'] / 若值为 false 则表示无需查重
 *  - addTime: Boolean, 是否添加创建时间
 *  - uniqueName: String, 查重处理返回的重复字段名称
 */
export default props => {
  return async (ctx, next) => {
    const { Model, process, key, addTime, uniqueName } = props

    const postData = process ? process(ctx.request.body) : ctx.request.body

    const uniqueKey = !key ? (key === false ? false : ['name']) : key
    const uniqueText = uniqueName ? uniqueName : '名称'

    const addItem = async () => {
      if (addTime) postData.created_time = Date.parse(new Date()) / 1000
      try {
        // 返回值 docs : Array|Object （返回成功创建的数据文档/文档数组）
        const doc = await Model.create(postData)
        ctx.body = {
          data: doc,
          ...addSuccess,
        }
      } catch (err) {
        throw new errs.HttpException('添加失败' + err.message)
      }
    }
    if (postData._id) {
      // 修改数据
      try {
        // 返回值： doc: Object 默认是更新之前的文档，如果在options传了new: true，则是更新之后的文档。没查到匹配的则是null
        await Model.findByIdAndUpdate(postData._id, postData).exec()
        ctx.body = editSuccess
      } catch (err) {
        throw new errs.HttpException('添加失败：' + err.message)
      }
    } else {
      // 新增数据
      if (uniqueKey) {
        // 查重处理
        let condition = {}
        uniqueKey.forEach(item => {
          if (postData[item]) {
            condition[item] = postData[item]
          }
        })
        if (Object.keys(condition).length) {
          const doc = await Model.findOne(condition)
          if (doc) {
            throw new errs.ParameterException(
              `该${uniqueText}已存在，请勿重复添加`,
              10000,
              409
            )
          } else {
            await addItem()
          }
        } else {
          await addItem()
        }
      } else {
        await addItem()
      }
    }
  }
}

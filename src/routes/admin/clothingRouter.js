const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'
import { removeImage, removeAllImage } from '@/middlewares/common/removeImage'

import Clothing from '@/model/clothing'

// 服饰列表路由
router.get(
  '/',
  getList({
    Model: Clothing,
    conditionKeys: [
      'type',
      'color',
      'theme',
      'activity',
      'channels',
      'style',
      'orderType',
      'saleTime',
    ],
  })
)

// 实时搜索全部符合条件的服饰
router.get('/search', searchAll({ Model: Clothing }))

// 添加功能路由
router.post('/', removeImage(Clothing), addData({ Model: Clothing }))

// 查询功能路由
router.get('/:id', getById({ Model: Clothing }))

// 删除功能路由
router.delete('/:id', removeAllImage(Clothing), deleteById({ Model: Clothing }))

router.name = 'clothing'

export default router

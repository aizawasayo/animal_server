const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'
import auth from '@/middlewares/user/auth'
import { removeImage, removeAllImage } from '@/middlewares/common/removeImage'

import Furniture from '@/model/furniture'

// 分页列表路由
router.get('/', getList({ Model: Furniture }))

// 实时搜索全部符合条件的家具
router.get('/search', searchAll({ Model: Furniture }))

// 添加功能路由
router.post('/', auth, removeImage(Furniture), addData({ Model: Furniture }))

// 查询功能路由
router.get('/:id', getById({ Model: Furniture }))

// 删除功能路由
router.delete(
  '/:id',
  auth,
  removeAllImage(Furniture),
  deleteById({ Model: Furniture })
)

router.name = 'furniture'

export default router

const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import getAll from '@/middlewares/common/getAll'
import auth from '@/middlewares/user/auth'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import Banner from '@/model/banner'

// 焦点图分页查询列表路由
router.get(
  '/',
  getList({
    Model: Banner,
    initialQueryKey: 'title',
    conditionKeys: ['state'],
    initialSortKey: 'title',
  })
)

// 获取全部焦点图路由
router.get(
  '/list',
  getAll({ Model: Banner, conditionKey: 'state', initialSortKey: 'title' })
)

// 焦点图添加功能路由
router.post(
  '/',
  auth,
  removeAvatar(Banner, 'avatar'),
  addData({
    Model: Banner,
    key: ['title'],
    addTime: true,
    uniqueName: '标题',
    // imageType: 'avatar',
  })
)

// 焦点图查询功能路由
router.get('/:id', getById({ Model: Banner }))

// 删除焦点图
router.delete(
  '/:id',
  auth,
  removeAllAvatar(Banner, 'avatar'),
  deleteById({ Model: Banner })
)

router.name = 'banner'

export default router

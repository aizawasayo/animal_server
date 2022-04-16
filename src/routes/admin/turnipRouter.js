const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import authData from '@/middlewares/turnip/auth'
import auth from '@/middlewares/user/auth'

import Turnip from '@/model/turnip'

// 大头菜列表路由
router.get(
  '/',
  getList({
    Model: Turnip,
    initialQueryKey: 'detail',
    initialSortKey: 'validTime',
    ref: 'user',
  })
)

// 大头菜添加功能路由
router.post(
  '/',
  auth,
  authData({ Model: Turnip }),
  addData({ Model: Turnip, key: ['detail'], addTime: true, uniqueName: '内容' })
)

// 大头菜查询功能路由
router.get('/:id', getById({ Model: Turnip, ref: 'user' }))

// 大头菜删除功能路由
router.delete('/:id', auth, deleteById({ Model: Turnip }))

router.name = 'turnip'

export default router

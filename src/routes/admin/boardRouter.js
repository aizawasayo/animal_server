const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'
import { removeImage, removeAllImage } from '@/middlewares/common/removeImage'

import Board from '@/model/board'

// 列表路由
router.get(
  '/',
  getList({
    Model: Board,
    initialSortKey: 'created_time',
    ref: 'user',
  })
)

// 添加功能路由
router.post(
  '/',
  auth,
  removeImage(Board),
  addData({ Model: Board, key: ['content'], addTime: true, uniqueName: '内容' })
)

// 查询功能路由
router.get('/:id', getById({ Model: Board, ref: 'user' }))

// 删除功能路由
router.delete('/:id', auth, removeAllImage(Board), deleteById({ Model: Board }))

router.name = 'board'

export default router

const Router = require('@koa/router')
const router = new Router()

import BoardComment from '@/model/board_comment'

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

// 分页查询森友墙评论列表
router.get(
  '/',
  getList({
    Model: BoardComment,
    initialQueryKey: 'content',
    conditionKeys: ['aid'],
    initialSortKey: 'like',
    initialSortVal: -1,
    ref: 'uid',
  })
)

// 添加森友墙评论路由
router.post('/', addData({ Model: BoardComment, addTime: true, key: false }))

// 森友墙评论查询路由
router.get('/:id', getById({ Model: BoardComment }))

// 删除森友墙评论
router.delete('/:id', deleteById({ Model: BoardComment }))

router.name = 'comment/board'

export default router

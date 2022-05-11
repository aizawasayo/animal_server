const Router = require('@koa/router')
const router = new Router()

import TurnipComment from '@/model/turnip_comment'

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import auth from '@/middlewares/user/auth'

// 分页查询菜市场评论列表
router.get(
  '/',
  getList({
    Model: TurnipComment,
    initialQueryKey: 'content',
    initialSortKey: 'like',
    initialSortVal: -1,
    ref: 'uid',
  })
)

// 菜市场评论添加路由
router.post(
  '/',
  auth,
  addData({ Model: TurnipComment, addTime: true, key: false })
)

// 菜市场评论查询路由
router.get('/:id', getById({ Model: TurnipComment, ref: 'uid' }))

// 删除菜市场评论
router.delete('/:id', auth, deleteById({ Model: TurnipComment }))

router.name = 'comment/turnip'

export default router

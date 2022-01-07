const Router = require('@koa/router')
const router = new Router()

import GuideComment from '@/model/guide_comment'

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'

// 分页查询攻略评论列表路由
router.get(
  '/',
  getList({
    Model: GuideComment,
    initialQueryKey: 'content',
    conditionKeys: ['aid'],
    initialSortKey: 'like',
    initialSortVal: -1,
    ref: 'uid',
  })
)

// 攻略评论添加路由
router.post('/', addData({ Model: GuideComment, addTime: true, key: false }))

// 攻略评论查询路由
router.get('/:id', getById({ Model: GuideComment }))

// 删除攻略评论
router.delete('/:id', deleteById({ Model: GuideComment }))

router.name = 'comment/guide'

export default router

const Router = require('@koa/router')
const router = new Router()

import GuideComment from '@/model/guide_comment'

import AddData from '@/utils/common/add'
import getById from '@/utils/common/getOne'
import deleteById from '@/utils/common/delete'
import commentList from './guideList'

// 分页查询攻略评论列表路由
router.get('/', commentList)

// 攻略评论添加路由
router.post('/', async (ctx, next) => {
  await addData({ ctx, next }, GuideComment, {
    key: false,
    addTime: true,
  })
})

// 攻略评论查询路由
router.get('/:id', async (ctx, next) => {
  await getById({ ctx, next }, GuideComment)
})

// 删除攻略评论
router.delete('/:id', async (ctx, next) => {
  await deleteById({ ctx, next }, GuideComment)
})

router.name = 'comment/guide'

export default router

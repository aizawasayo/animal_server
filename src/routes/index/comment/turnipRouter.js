const Router = require('@koa/router')
const router = new Router()

import TurnipComment from '@/model/turnip_comment'

import AddData from '@/utils/common/add'
import getById from '@/utils/common/getOne'
import deleteById from '@/utils/common/delete'
import commentList from './turnipList'

// 分页查询菜市场评论列表
router.get('/', commentList)

// 菜市场评论添加路由
router.post('/', async (ctx, next) => {
  await addData({ ctx, next }, TurnipComment, {
    key: false,
    addTime: true,
  })
})

// 菜市场评论查询路由
router.get('/:id', async (ctx, next) => {
  await getById({ ctx, next }, TurnipComment)
})

// 删除菜市场评论
router.delete('/:id', async (ctx, next) => {
  await deleteById({ ctx, next }, TurnipComment)
})

router.name = 'comment/turnip'

export default router

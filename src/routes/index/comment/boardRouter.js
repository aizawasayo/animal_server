const Router = require('@koa/router')
const router = new Router()

import BoardComment from '@/model/board_comment'

import AddData from '@/utils/common/add'
import getById from '@/utils/common/getOne'
import deleteById from '@/utils/common/delete'
import commentList from './boardList'

// 分页查询森友墙评论列表
router.get('/', commentList)

// 添加森友墙评论路由
router.post('/', async (ctx, next) => {
  await addData({ ctx, next }, BoardComment, {
    key: false,
    addTime: true,
  })
})

// 森友墙评论查询路由
router.get('/:id', async (ctx, next) => {
  await getById({ ctx, next }, BoardComment)
})

// 删除森友墙评论
router.delete('/:id', async (ctx, next) => {
  await deleteById({ ctx, next }, BoardComment)
})

router.name = 'comment/board'

export default router

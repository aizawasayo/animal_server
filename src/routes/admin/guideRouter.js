const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import addData from '@/middlewares/common/add'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import Guide from '@/model/guide'

// 攻略列表路由
router.get(
  '/',
  getList({
    Model: Guide,
    initialQueryKey: 'title',
    conditionKeys: ['comment_disabled', 'status', 'author'],
    initialSortKey: 'created_time',
    ref: 'author',
  })
)

// 攻略添加功能路由
router.post(
  '/',
  removeAvatar(Guide),
  addData({
    Model: Guide,
    process: data => {
      const processedData = Object.assign({}, data)
      if (data.author) processedData.author = processedData.author._id
      return processedData
    },
    key: ['title'],
    addTime: true,
    uniqueName: '标题',
  })
)

// 攻略查询功能路由
router.get('/:id', getById({ Model: Guide, ref: 'author' }))

// 删除攻略
router.delete('/:id', removeAllAvatar(Guide), deleteById({ Model: Guide }))

router.name = 'guide'

export default router

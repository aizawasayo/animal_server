const Router = require('@koa/router')
const router = new Router()

import getList from '@/middlewares/common/getList'
import getById from '@/middlewares/common/getOne'
import deleteById from '@/middlewares/common/delete'
import searchAll from '@/middlewares/common/search'
import userAdd from '@/middlewares/user/userAdd'
import userEdit from '@/middlewares/user/userEdit'
import pswModify from '@/middlewares/user/pswModify'
import auth from '@/middlewares/user/auth'
import {
  removeAvatar,
  removeAllAvatar,
} from '@/middlewares/common/removeAvatar'

import { User } from '@/model/user'

// 用户列表路由
router.get(
  '/',
  auth,
  getList({
    Model: User,
    initialQueryKey: ['username', 'nickname'],
    initialSortKey: 'username',
  })
)

// 实时搜索用户名字
router.get('/search', auth, searchAll({ Model: User, key: 'username' }))

// 用户添加功能路由
router.post('/', userAdd)

// 用户修改功能路由
router.put('/:id', auth, removeAvatar(User, 'avatar'), userEdit)

// 用户查询功能路由
router.get('/:id', auth, getById({ Model: User }))

// 删除用户信息
router.delete(
  '/:id',
  auth,
  removeAllAvatar(User, 'avatar'),
  deleteById({ Model: User })
)

// 用户修改密码路由
router.put('/psw/:id', auth, pswModify)

router.name = 'user'

export default router

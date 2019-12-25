const router = require('koa-router')()

router.prefix('/pc-blog')

router.post('/user/login', async (ctx, next) => {
  const {username, password} = ctx.request.body;
  ctx.body = {
    data: {
      username,
      code:1
    }
  }
})

module.exports = router

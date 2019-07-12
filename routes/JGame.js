const Router = require('koa-router');

const router = new Router({
  prefix: '/game',
});
router
  .get('/test', async (ctx) => {
    ctx.response.body = 'test';
  });

module.exports = router;

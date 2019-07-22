const Router = require('koa-router');

const router = new Router({
    prefix: '/test',
});
router
    .get('/testPrint', async (ctx) => {
        ctx.response.body = '这是JTest的测试接口';
    });

module.exports = router;

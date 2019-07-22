const Router = require('koa-router');

const usrRouter = new Router({
    prefix: '/usr',
});

usrRouter
    .post('/login', async (ctx) => {});

module.exports = usrRouter;

const Router = require('koa-router');

const usrRouter = new Router({
    prefix: '/usr',
});

usrRouter
    .post('/login', async (ctx) => {
        const { usrName, psWord } = ctx.request.body;
    });

module.exports = usrRouter;

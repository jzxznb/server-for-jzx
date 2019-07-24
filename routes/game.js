/* eslint-disable no-undef */
/* eslint-disable no-console */
const Router = require('koa-router');

const gameRouter = new Router({
    prefix: '/game',
});
gameRouter
    .get('/gamePrint', async (ctx) => {
        ctx.response.body = '这是JGame的测试';
    });

module.exports = {
    gameRouter,
};

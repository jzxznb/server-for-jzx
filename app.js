/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('koa2-cors');
const {
    gameRouter,
} = require('./routes/game');
const usrRouter = require('./routes/user');
const testRouter = require('./routes/test');

const app = new Koa();


app.use(cors());
// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(gameRouter.routes())
    .use(testRouter.routes())
    .use(usrRouter.routes());

module.exports = app;

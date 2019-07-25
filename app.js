/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const { gameRouter } = require('./routes/game');
const usrRouter = require('./routes/user');
const { chatRouter } = require('./routes/chat');
const { webRouter } = require('./routes/webEditor');

const app = new Koa();


app.use(cors());
app.use(bodyparser());
// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(gameRouter.routes())
    .use(usrRouter.routes())
    .use(chatRouter.routes())
    .use(webRouter.routes());

module.exports = app;

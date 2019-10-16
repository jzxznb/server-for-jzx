/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const staticFile = require('koa-static');
const { gameRouter } = require('./routes/game');
const usrRouter = require('./routes/user');
const { chatRouter } = require('./routes/chat');
const { webRouter } = require('./routes/webEditor');
const { h5Router } = require('./routes/h5Editor');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(staticFile('./ssrDist'));
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
    .use(webRouter.routes())
    .use(h5Router.routes());

module.exports = app;

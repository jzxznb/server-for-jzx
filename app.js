/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const cssStatic = require('koa-static');
const { gameRouter } = require('./routes/game');
const usrRouter = require('./routes/user');
const { chatRouter } = require('./routes/chat');
const { webRouter } = require('./routes/webEditor');
const { webEditorV2 } = require('./routes/webEditorV2');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(cssStatic('./node_modules/plugins/Container.css'));
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
    .use(webEditorV2.routes());

module.exports = app;

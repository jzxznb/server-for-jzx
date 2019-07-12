/* eslint-disable no-console */
const Koa = require('koa');
const cors = require('koa2-cors');
const gameRouter = require('./routes/JGame');
// const testRouter = require('./routes/JTest');

const app = new Koa();


app.use(cors());
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(gameRouter.routes());
// .use();

module.exports = app;

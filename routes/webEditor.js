const Router = require('koa-router');
const { EditorModel } = require('../src/model/webEditor');

const webRouter = new Router({
    prefix: '/webEditor',
});

webRouter
    .post('/getWebList', async (ctx) => {
        const res = await EditorModel.find();
        ctx.response.body = res;
    })
    .post('/newEditor', async (ctx) => {
        const { webName } = ctx.request.body;
        const res = await EditorModel.insert({
            webName,
            mTime: Number(new Date()),
        });
        ctx.response.body = res;
    })
    .post('/removeWeb', async (ctx) => {
        const { webId } = ctx.request.body;
        const res = await EditorModel.remove({ _id: webId });
        if (res.ok) ctx.response.body = '删除成功';
    });

module.exports = {
    webRouter,
};

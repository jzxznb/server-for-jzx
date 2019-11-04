const Router = require('koa-router');
const fs = require('fs');
const { EditorModel } = require('../src/model/h5Editor');

const htmlTemplate = fs.readFileSync('./ssrDist/ssrTemplate.html', 'utf-8');

const h5Router = new Router({
    prefix: '/h5Editor',
});
// const FAILED = '失败,请联系阿星或稍后再试';
h5Router
    .post('/getWebList', async (ctx) => {
        // 后续增加分页
        const res = await EditorModel.find({}, ['_id', 'mTime', 'webName']);
        ctx.response.body = res;
    })
    .post('/saveWebData', async (ctx) => {
        const { body, webName } = ctx.request.body;
        const res = await EditorModel.insert({ body, mTime: Number(new Date()), webName });
        ctx.response.body = res;
    })
    .post('/getPageById', async (ctx) => {
        try {
            const { pageId } = ctx.request.body;
            const [res] = await EditorModel.find({ _id: pageId }, ['body']);
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                body: null,
                _id: '-1',
            };
        }
    })
    .get('/getHomePage', async (ctx) => {
        try {
            const { pageId } = ctx.query;
            const [res] = await EditorModel.find({ _id: pageId });
            ctx.response.body = htmlTemplate.replace('默认网页名:阿星的模板页面', res.webName);
        } catch (er) {
            ctx.body = '请输入正确的网页id';
        }
    });
module.exports = {
    h5Router,
};

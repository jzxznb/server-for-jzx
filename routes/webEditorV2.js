const Router = require('koa-router');
const fs = require('fs');
const { EditorModel } = require('../src/model/webEditorV2');
const htmlTemplate = fs.readFileSync('./ssrDist/ssrTemplate.html', 'utf-8');

const webEditorV2 = new Router({
    prefix: '/webEditorV2'
});
// const FAILED = '失败,请联系阿星或稍后再试';
webEditorV2
    .post('/saveWebData', async ctx => {
        const data = ctx.request.body;
        const res = await EditorModel.insert({
            body: data
        });
        ctx.response.body = res;
    })
    .post('/getPageById', async ctx => {
        const { pageId } = ctx.request.body;
        const [res] = await EditorModel.find({ _id: pageId });
        ctx.response.body = res.body;
    })
    .get('/getHomePage', async ctx => {
        try {
            const { pageId } = ctx.query;
            const res = await EditorModel.find({ _id: pageId });
            ctx.body = htmlTemplate;
        } catch (er) {
            console.log(er);
            ctx.body = '请输入正确的网页id';
        }
    });
module.exports = {
    webEditorV2
};

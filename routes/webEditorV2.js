const Router = require('koa-router');
const { EditorModel } = require('../src/model/webEditorV2');

const webEditorV2 = new Router({
    prefix: '/webEditorV2',
});
const FAILED = '失败,请联系阿星或稍后再试';
const htmlTemp = '';
webEditorV2
    .post('/saveWebData', async (ctx) => {
        const data = ctx.request.body;
        const res = await EditorModel.insert({
            body: data,
        });
        ctx.response.body = res;
    })
    .get('/getHomePage/:pageId', async (ctx) => {
        const { pageId } = ctx.params;
        const res = await EditorModel.find({ _id: pageId });
        ctx.body = res[0].body;
    });
module.exports = {
    webEditorV2,
};

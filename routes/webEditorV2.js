const Router = require('koa-router');
const fs = require('fs');
const axios = require('axios');
const { EditorModel } = require('../src/model/webEditorV2');

const templateHtml = fs.readFileSync('./src/ssr/weditor.temp.html');
const moduleUrl = 'https://jzxznb.github.io/Container.js';
const webEditorV2 = new Router({
    prefix: '/webEditorV2',
});
const importModule = async () => {
    const r = await axios.get(moduleUrl);
    return r.data;
};
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
        const Container = await importModule();
        // const rr = require(Object(Container).default);
        console.log(JSON.parse(Container));
        ctx.response.body = Container;
        // ctx.body = templateHtml.toString();
    });
module.exports = {
    webEditorV2,
};

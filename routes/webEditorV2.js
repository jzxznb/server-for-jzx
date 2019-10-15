const Router = require('koa-router');
const fs = require('fs');
const React = require('react');
const { default: Container } = require('plugins/Container');
const { renderToNodeStream, renderToString } = require('react-dom/server');
const streamToPromise = require('stream-to-promise');
const { EditorModel } = require('../src/model/webEditorV2');

const templateHtml = fs.readFileSync('./src/ssr/weditor.temp.html', 'utf-8');
const webEditorV2 = new Router({
    prefix: '/webEditorV2',
});
const FAILED = '失败,请联系阿星或稍后再试';
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
        const htmlStream = await streamToPromise(
            renderToNodeStream(
                React.createElement(Container, {
                    options: {
                        childNodes: res[0].body,
                    },
                }),
            ),
        );
        ctx.body = templateHtml.replace('<!--react-ssr-outlet-->', htmlStream.toString());
    });
module.exports = {
    webEditorV2,
};

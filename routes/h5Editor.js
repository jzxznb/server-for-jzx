const Router = require('koa-router');
const fs = require('fs');
const { EditorModel } = require('../src/model/h5Editor');

const htmlTemplate = fs.readFileSync('./ssrDist/ssrTemplate.html', 'utf-8');

const h5Router = new Router({
    prefix: '/h5Editor',
});
// const FAILED = '失败,请联系阿星或稍后再试';
h5Router
    .post('/getPageList', async (ctx) => {
        // 后续增加分页
        const res = await EditorModel.find({}, ['_id', 'mTime', 'webName']);
        ctx.response.body = res;
    })
    .post('/updatePage', async (ctx) => {
        try {
            const { webData, pageId } = ctx.request.body;
            const res = await EditorModel.update({ _id: pageId }, {
                webData,
                mTime: Number(new Date()),
            });
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '保存失败',
            };
        }
    })
    .post('/insertPage', async (ctx) => {
        try {
            const { webData } = ctx.request.body;
            const res = await EditorModel.insert({ webData, mTime: Number(new Date()), webName: '新建默认页面' });
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '新建失败',
            };
        }
    })
    .post('/removePage', async (ctx) => {
        try {
            const { pageId } = ctx.request.body;
            await EditorModel.remove({ _id: pageId });
            ctx.response.body = {
                code: 'success',
                msg: '删除成功',
            };
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '删除失败',
            };
        }
    })
    .post('/getPageById', async (ctx) => {
        try {
            const { pageId } = ctx.request.body;
            const [res] = await EditorModel.find({ _id: pageId }, ['webData']);
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '获取页面失败',
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

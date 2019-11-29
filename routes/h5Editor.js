const Router = require('koa-router');
const fs = require('fs');
const { EditorModel, CommentModel, DiaryModel } = require('../src/model/h5Editor');
const {
    serverRender,
    streamToPromise,
    renderToNodeStream
} = require('../ssrDist/server/serverEntry');

const htmlTemplate = fs.readFileSync('./ssrDist/client/ssrTemplate.html', 'utf-8');

const h5Router = new Router({
    prefix: '/h5Editor'
});
// const FAILED = '失败,请联系阿星或稍后再试';
h5Router
    // 获取页面数据
    .post('/getPageList', async ctx => {
        // 后续增加分页
        const { data } = await EditorModel.find({}, ['_id', 'mTime', 'webName']);
        ctx.response.body = data;
    })
    .post('/getPageById', async ctx => {
        try {
            const { pageId } = ctx.request.body;
            const { data } = await EditorModel.find(
                {
                    _id: pageId
                },
                ['webData']
            );
            [ctx.response.body] = data;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '获取页面失败'
            };
        }
    })
    .post('/getComment', async ctx => {
        try {
            const { pageId, pageSize = 5, currentPage = 0 } = ctx.request.body;
            const data = await CommentModel.find(
                {
                    pageId
                },
                ['sender', 'mTime', 'text', 'uid'],
                pageSize,
                currentPage,
                { mTime: -1 }
            );
            ctx.response.body = data;
        } catch (error) {
            ctx.response.body = {
                code: 'error',
                msg: '获取评论失败'
            };
        }
    })
    .post('/getDiaryData', async ctx => {
        try {
            const {
                keys = [],
                o,
                pageSize = 0,
                currentPage = 0,
                sort = { mTime: -1 }
            } = ctx.request.body;
            const data = await DiaryModel.find(
                {
                    ...o
                },
                keys,
                pageSize,
                currentPage,
                sort
            );
            ctx.response.body = data;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '获取日记数据失败'
            };
        }
    })
    // b端提交数据
    .post('/updatePage', async ctx => {
        try {
            const { webData, pageId } = ctx.request.body;
            const res = await EditorModel.update(
                {
                    _id: pageId
                },
                {
                    webData,
                    mTime: Number(new Date())
                }
            );
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '保存失败'
            };
        }
    })
    .post('/updatePageName', async ctx => {
        try {
            const { pageId, webName } = ctx.request.body;
            const res = await EditorModel.update({ _id: pageId }, { webName });
            if (res.ok !== 1) {
                throw Error('e');
            }
            ctx.response.body = {
                code: 'success',
                msg: '修改成功'
            };
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '修改失败'
            };
        }
    })
    .post('/insertPage', async ctx => {
        try {
            const { webData } = ctx.request.body;
            const res = await EditorModel.insert({
                webData,
                mTime: Number(new Date()),
                webName: '新建默认页面'
            });
            ctx.response.body = res;
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '新建失败'
            };
        }
    })
    .post('/removePage', async ctx => {
        try {
            const { pageId } = ctx.request.body;
            await EditorModel.remove({ _id: pageId });
            ctx.response.body = {
                code: 'success',
                msg: '删除成功'
            };
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '删除失败'
            };
        }
    })
    // c端提交数据
    .post('/sendComment', async ctx => {
        try {
            const { sender, text, pageId, uid } = ctx.request.body;
            await CommentModel.insert({
                sender,
                text,
                mTime: Number(new Date()),
                pageId,
                uid: uid || -1
            });
            ctx.response.body = {
                code: 'success',
                msg: '提交评论成功'
            };
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '提交评论失败'
            };
        }
    })
    .post('/newDiary', async ctx => {
        try {
            const { pageId, catalog, text } = ctx.request.body;
            await DiaryModel.insert({
                pageId,
                catalog,
                text,
                mTime: Number(new Date())
            });
            ctx.response.body = {
                code: 'success',
                msg: '发表成功'
            };
        } catch (err) {
            ctx.response.body = {
                code: 'error',
                msg: '提交新日记失败'
            };
        }
    })
    // 页面渲染部分
    .get('/getHomePage', async ctx => {
        try {
            const { pageId } = ctx.query;
            const { data } = await EditorModel.find({
                _id: pageId
            });
            const ssrData = renderToNodeStream(serverRender(data[0].webData));
            const res = await streamToPromise(ssrData);
            ctx.response.body = htmlTemplate
                .replace('默认网页名:阿星的模板页面', res.webName)
                .replace('<!-- react--ssr--jzx--out--put -->', res.toString());
        } catch (er) {
            ctx.body = '请输入正确的网页id';
        }
    });
module.exports = {
    h5Router
};

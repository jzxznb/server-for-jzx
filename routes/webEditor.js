const Router = require('koa-router');
const { EditorModel } = require('../src/model/webEditor');
const FileSystem = require('../src/fs/fileSystem');

const webRouter = new Router({
    prefix: '/webEditor',
});

const FAILED = '失败,请联系阿星或稍后再试';
webRouter
    .post('/getPageList', async (ctx) => {
        try {
            const res = await EditorModel.find();
            ctx.response.body = res;
        } catch (e) {
            ctx.response.body = e;
        }
    })
    .post('/newEditor', async (ctx) => {
        try {
            const { webName } = ctx.request.body;
            const res = await EditorModel.insert({
                webName,
                mTime: Number(new Date()),
            });
            ctx.response.body = res;
        } catch (e) {
            ctx.response.body = e;
        }
    })
    .post('/removeWeb', async (ctx) => {
        const { webId } = ctx.request.body;
        const dbres = await EditorModel.remove({ _id: webId });
        new FileSystem('webFile').deleteFile(webId);
        if (dbres.ok === 1) {
            ctx.response.body = '删除成功';
        } else {
            ctx.response.body = `删除${FAILED}`;
        }
    })
    .post('/updateName', async (ctx) => {
        try {
            const { webId, webName } = ctx.request.body;
            const res = await EditorModel.update({ _id: webId }, { webName, mTime: Number(new Date()) });
            if (res.ok === 1) {
                ctx.response.body = '修改成功';
            } else {
                ctx.response.body = `更名${FAILED}`;
            }
        } catch (e) {
            ctx.response.body = e;
        }
    })
    .post('/getPageData', async (ctx) => {
        try {
            const { _id } = ctx.request.body;
            const fsRes = new FileSystem('webFile').readFile(_id);
            if (fsRes !== -1) {
                ctx.response.body = fsRes;
            } else {
                ctx.response.body = `读取数据${FAILED}`;
            }
        } catch (e) {
            ctx.response.body = e;
        }
    })
    .post('/saveWj', async (ctx) => {
        try {
            const { webJson, id } = ctx.request.body;
            const dbRes = await EditorModel.update({ _id: id }, { mTime: Number(new Date()) });
            const fsRes = new FileSystem('webFile').updateFile(id, JSON.stringify(webJson));
            if (dbRes.ok === 1 && fsRes !== -1) {
                ctx.response.body = '保存成功';
            } else {
                ctx.response.body = `保存${FAILED}`;
            }
        } catch (e) {
            ctx.response.body = e;
        }
    });

module.exports = {
    webRouter,
};

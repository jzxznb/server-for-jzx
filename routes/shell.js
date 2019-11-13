const Router = require('koa-router');
const { exec } = require('child_process');
const fs = require('fs');


const shellRouter = new Router({
    prefix: '/shell',
});

const rootPath = './../';

const publish = {
    page: 'rm -rf editor-build \n git clone git@github.com:jzxznb/editor-build.git',
};

shellRouter.get('/publishPage', async (ctx) => {
    try {
        const files = fs.readdirSync(rootPath);
        if (!files.includes('pull-editor')) {
            fs.writeFileSync(`${rootPath}pull-editor.sh`, publish.page);
        }
        const { stdout } = await exec(`cd ${rootPath} && sh pull-editor.sh`);
        if (stdout) {
            ctx.response.body = '发布成功';
        }
    } catch (e) {
        ctx.response.body = '发布失败';
    }
});

module.exports = {
    shellRouter,
};

const Router = require('koa-router');
const { exec } = require('child_process');
const fs = require('fs');


const shellRouter = new Router({
    prefix: '/shell',
});

const rootPath = './';

const publish = {
    page: 'mkdir testExe',
};

shellRouter.get('/publishPage', async (ctx) => {
    try {
        const files = fs.readdirSync(rootPath);
        if (!files.includes('publishPage')) {
            fs.writeFileSync(`${rootPath}publishPage.sh`, publish.page);
        }
        const t = await exec('cd ../ | sh publishPage.sh');
    } catch (e) {
    }
    ctx.response.body = '123';
});

module.exports = {
    shellRouter,
};

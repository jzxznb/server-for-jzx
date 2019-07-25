const Router = require('koa-router');
const { ChatModel } = require('../src/model/chatModel');

const chatRouter = new Router({
    prefix: '/chat',
});

chatRouter
    .get('/chatTest', async (ctx) => {
        ctx.response.body = 'chat接口测试';
        const result = await ChatModel.find();
        ctx.response.body = result;
    })
    .post('/getMess', async (ctx) => {
        const result = await ChatModel.find();
        ctx.response.body = result;
    });

module.exports = {
    chatRouter,
};

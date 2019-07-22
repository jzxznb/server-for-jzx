/* eslint-disable no-undef */
/* eslint-disable no-console */
const Router = require('koa-router');

const gameRouter = new Router({
    prefix: '/game',
});
gameRouter
    .get('/gamePrint', async (ctx) => {
        ctx.response.body = '这是JGame的测试';
    });

const initIO = () => {
    io.on('connection', (socket) => {
        console.log('socket 连接完毕');
        socket.on('send', (data) => {
            io.sockets.emit('receive', data); // 给所有人发送信息
            // socket.broadcast.emit('receive', data); // 给除了自己的其他人发信息
        });
    });
};

module.exports = {
    gameRouter,
    initIO,
};

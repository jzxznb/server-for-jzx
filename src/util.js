/* eslint-disable no-console */
/* eslint-disable no-undef */
const initIO = () => {
    io.on('connection', (socket) => {
        console.log('weChat!');
        socket.on('sendMess', (data) => {
            io.sockets.emit('getMess', data);
        });
    });
};

module.exports = {
    initIO,
};

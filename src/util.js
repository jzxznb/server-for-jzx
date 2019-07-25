/* eslint-disable no-console */
/* eslint-disable no-undef */
const { ChatModel } = require('./model/chatModel');

const initIO = () => {
    io.on('connection', (socket) => {
        console.log('weChat!');
        socket.on('sendMess', (data) => {
            ChatModel.insert({
                sender: data.sender,
                message: data.message,
                sendDate: Number(new Date()),
            });
            io.sockets.emit('getMess', data);
        });
    });
};

module.exports = {
    initIO,
};

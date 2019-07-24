const { MongoDB } = require('../mongodb/jmongo');

const chatSchema = {
    sender: String,
    message: String,
    sendDate: Number,
};
const collectionName = 'Chat';
const ChatModel = MongoDB(chatSchema, { collectionName });

module.exports = {
    ChatModel,
};

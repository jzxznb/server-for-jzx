const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/JDB';

const cbMongo = (cb) => {
    mongoose.connect(url, { useNewUrlParser: true });
    cb();
    mongoose.disconnect();
};

module.exports = cbMongo;

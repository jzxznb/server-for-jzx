const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/JDB';
class MGDB {
    constructor(schema, options) {
        const { collectionName, inUrl } = options;
        this.schema = schema;
        this.collectionName = collectionName;
        this.url = inUrl || url;
        this.model = mongoose.model(this.collectionName, this.schema);
        mongoose.connect(this.url, { useNewUrlParser: true });
    }
    /**
     * 插入一条数据
     * @param {*} obj
     */

    async insert(obj) {
        const Model = this.model;
        const newInfo = new Model(obj);
        await newInfo.save();
        return newInfo;
    }
    /**
     * 查询数据, 当o为{}查询所有数据
     * @param {*} o
     */

    async find(o) {
        const filter = o || {};
        const dataArr = await this.model.find(filter);
        return dataArr;
    }
    /**
     * 删除一条或多条记录
     * @param {*} filter
     */

    async remove(filter) {
        if (!filter) return '删除失败';
        const result = await this.model.deleteMany(filter);
        return result;
    }
    /**
     * 更新一条或者多条信息
     * @param {*} filter
     * @param {*} updateInfo
     */

    async update(filter, updateInfo) {
        if (!filter || !updateInfo) return '更新失败';
        const result = await this.model.updateMany(filter, updateInfo);
        return result;
    }

    // eslint-disable-next-line class-methods-use-this
    disconnect() {
        return mongoose.disconnect();
    }
}

const MongoDB = (model, options) => new MGDB(model, options);

module.exports = {
    MongoDB,
};

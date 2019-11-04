const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    webName: String,
    webData: Object,
    mTime: Number,
};

const collectionName = 'h5Editor';

const EditorModel = MongoDB(webSchema, { collectionName });

module.exports = {
    EditorModel,
};

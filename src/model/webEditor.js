const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    webName: String,
    mTime: Number,
};

const collectionName = 'webEditor';
const EditorModel = MongoDB(webSchema, { collectionName });

module.exports = {
    EditorModel,
};

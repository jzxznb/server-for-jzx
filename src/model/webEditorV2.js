const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    webName: String,
    body: Object,
    mTime: Number,
};

const collectionName = 'webEditorV2';

const EditorModel = MongoDB(webSchema, { collectionName });

module.exports = {
    EditorModel,
};

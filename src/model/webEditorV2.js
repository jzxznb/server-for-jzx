const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    body: Array,
};

const collectionName = 'webEditorV2';

const EditorModel = MongoDB(webSchema, { collectionName });

module.exports = {
    EditorModel,
};

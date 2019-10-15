const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    body: Object,
};

const collectionName = 'webEditorV2';

const EditorModel = MongoDB(webSchema, { collectionName });

module.exports = {
    EditorModel,
};

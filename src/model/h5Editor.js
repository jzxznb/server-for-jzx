const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    webName: String,
    webData: Object,
    mTime: Number,
};

const commentSchema = {
    sender: Object,
    text: String,
    pageId: String,
    mTime: Number,
    uid: Number,
};

const editorName = 'h5Editor';
const commentName = 'h5Comment';
const EditorModel = MongoDB(webSchema, { collectionName: editorName });
const CommentModel = MongoDB(commentSchema, { collectionName: commentName });

module.exports = {
    EditorModel,
    CommentModel,
};

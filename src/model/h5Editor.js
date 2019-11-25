const { MongoDB } = require('../mongodb/jmongo');

const webSchema = {
    webName: String,
    webData: Object,
    mTime: Number
};

const commentSchema = {
    sender: Object,
    text: String,
    pageId: String,
    mTime: Number,
    uid: Number
};
const diarySchema = {
    pageId: String,
    catalog: String,
    text: String,
    mTime: Number
};

const editorName = 'h5Editor';
const commentName = 'h5Comment';
const diaryName = 'h5Diary';
const EditorModel = MongoDB(webSchema, { collectionName: editorName });
const CommentModel = MongoDB(commentSchema, { collectionName: commentName });
const DiaryModel = MongoDB(diarySchema, { collectionName: diaryName });
module.exports = {
    EditorModel,
    CommentModel,
    DiaryModel
};

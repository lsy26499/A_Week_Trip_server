const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    communityId: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
    name: String,
    comment: String,
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { type: Number, require: true },
    //userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    comment: String,
    created_at: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

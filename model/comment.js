const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        userId: { type: Number, require: true },
        name: { type: String, require: true },
        comment: {
            type: String,
            require: true,
            validate: [
                function (comment) {
                    return comment.trim().length < 0;
                },
                '코멘트를 입력해야 합니다.',
            ],
        },
        communityID: { type: Schema.Types.ObjectId, ref: 'Community' },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        secret: { type: Boolean, require: true },
    },
    { timestamps: { createdAt: 'createdAt' } }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

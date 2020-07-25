const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        userId: { type: Number, require: true },
        //userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        name: String,
        comment: String,
        communityID: { type: Schema.Types.ObjectId, ref: 'Community' },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        //created_at: { type: Date, required: true, default: date },
    },
    { timestamps: { createdAt: 'createdAt' } }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

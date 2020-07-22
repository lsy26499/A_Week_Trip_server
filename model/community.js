const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    title: String,
    contents: String,
    visit: Number,
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

const Community = mongoose.model('Community', communitySchema);

export default Community;

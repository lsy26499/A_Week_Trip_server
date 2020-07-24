const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    userId: Number, // test userId
    //userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postNumber: { type: Number, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    article: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  
communitySchema.plugin(autoIncrement.plugin, {
    model: 'Communitys',
    field: 'postNumber',
    startAt: 1,
    increment: 1,
});

const Community = mongoose.model('Communitys', communitySchema);

export default Community;

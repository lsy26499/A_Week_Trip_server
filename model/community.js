const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const communitySchema = new Schema(
    {
        userId: { type: String, require: true },
        imageURL: String,
        key: String,
        order: { type: Number, required: true },
        name: { type: String, required: true },
        title: { type: String, required: true },
        article: { type: String, required: true },
        view: { type: Number, required: true, default: 0 },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { timestamps: { createdAt: 'createdAt' } }
);

communitySchema.plugin(autoIncrement.plugin, {
    model: 'Communitys',
    field: 'order',
    startAt: 1,
    increment: 1,
});

const Community = mongoose.model('Communitys', communitySchema);

export default Community;

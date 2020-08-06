const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, require: true },
    name: { type: String, required: true },
    googleEmail: String,
    jsonWebToken: String,
    favStation: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
    scrapPosts: [{ type: Schema.Types.ObjectId, ref: 'Communitys' }],
});

const User = mongoose.model('User', userSchema);

export default User;

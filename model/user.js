const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, require: true },
    name: { type: String, required: true },
    fbToken: String,
    googleToken: String,
    googleReToken: String,
    jsonWebToken: String,
    favStation: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
    scrapPosts: [{ type: Schema.Types.ObjectId, ref: 'communitys' }],
});

const User = mongoose.model('User', userSchema);

export default User;

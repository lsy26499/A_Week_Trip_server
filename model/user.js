const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //TODO: User Login API 구현 시 채울 것
    userId: { type: Number, require: true },
    email: String,
    fbToken: String,
    jsonWebToken: String,
    favStation: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
    scrapPosts: [{ type: Schema.Types.ObjectId, ref: 'communitys' }],

    //? FIXME: populate는 "mongoDB 기준 필드명"으로 적용됩니다. populate를 쓰실 거면 ref를 바꾸어야 합니다.
    //? ????????????? community만 그렇습니다. 이상...... 합니다.
});

const User = mongoose.model('User', userSchema);

export default User;

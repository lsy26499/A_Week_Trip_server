import { ObjectID } from 'mongodb';
import Community from './community';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // User Login API 구현 시 채울 것
    // 내가 작성한 게시글 삽입을 위한 Fake userId
    userId: { type: Number, require: true },
    posts: Array,
});

const User = mongoose.model('User', userSchema);

export default User;

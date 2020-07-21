const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // User Login API 구현 시 채울 것
});

const User = mongoose.model('User', userSchema);

export default User;

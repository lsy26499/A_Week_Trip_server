import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/AWT');

const db = mongoose.connection;

db.on('error', function () {
  console.log('❌ DB Connection Failed!');
});

db.once('open', function () {
  console.log('✅ DB Connected!');
});

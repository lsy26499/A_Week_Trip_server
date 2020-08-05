import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(
    'mongodb://127.0.0.1:27017/AWT',
    { useUnifiedTopology: true, useNewUrlParser: true },
    (error) => {
        if (error) console.log(error);
    }
);

const db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', function () {
    console.log('❌ DB Connection Failed!');
});

db.once('open', function () {
    console.log('✅ DB Connected!');
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bestplanSchema = new Schema({
    courseList: Array,
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

const Bestplan = mongoose.model('Bestplan', bestplanSchema);

export default Bestplan;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoDetailSchema = new Schema({
    _id: false,
    name: String,
    info: String,
    phone: Number,
    address: String,
});
const stationSchema = new Schema({
    station: { type: String, required: true },
    stationNumber: { type: Number, required: true },
    stationInfo: { type: String, required: true },
    lodging: [infoDetailSchema],
    tourism: [infoDetailSchema],
    food: [infoDetailSchema],
});

const Station = mongoose.model('Station', stationSchema);

export default Station;

/*
    created_at: { type: Date, required: true, default: new Date().getTime() },
    updated_at: { type: Date, required: true, default: new Date().getTime() },
*/

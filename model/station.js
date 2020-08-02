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
    coord: { any: Object },
});

stationSchema.index({ station: 'text' });

const Station = mongoose.model('Station', stationSchema);

export default Station;

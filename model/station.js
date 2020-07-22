const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    station: { type: String, required: true },
    stationNumber: { type: Number, required: true },
    info: { type: String, required: true },
    lodging: { type: Array, required: true },
    tourism: { type: Array, required: true },
    food: { type: Array, required: true },
});

const Station = mongoose.model('Station', stationSchema);

export default Station;

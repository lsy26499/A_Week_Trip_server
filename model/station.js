const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    station: { type: String, required: true },
    info: { type: String, required: true },
    lodging: { type: Array, required: true },
    tourism: Array,
    food: Array,
});

const Station = mongoose.model('Station', stationSchema);

export default Station;

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    station: { type: String, required: true },
    coord: { any: Array },
});

stationSchema.plugin(autoIncrement.plugin, {
    model: 'Station',
    field: 'StationNumber',
    startAt: 1,
    increment: 1,
});

stationSchema.index({ station: 'text' });

const Station = mongoose.model('Station', stationSchema);

export default Station;

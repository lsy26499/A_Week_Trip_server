const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    station: { type: String, required: true },
    stationNumber: { type: Number, required: true },
    coord: { any: Array },
});

stationSchema.index({ station: 'text' });

const Station = mongoose.model('Station', stationSchema);

export default Station;

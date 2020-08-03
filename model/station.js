const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    station: { type: String, required: true },
    stationNumber: { type: Number, required: true },
    stationInfo: { type: String, required: true },
    coord: { any: Object },
});

stationSchema.index({ station: 'text' });

const Station = mongoose.model('Station', stationSchema);

export default Station;

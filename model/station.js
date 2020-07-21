const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  station: String,
  info: String,
  lodging: Array,
  tourism: Array,
  food: Array,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Station = mongoose.model('Station', stationSchema);

export default Station;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  station: String,
  info: Array,
  lodging: String,
  tourism: String,
  food: String,
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Station = mongoose.model('Station', stationSchema);

export default Station;

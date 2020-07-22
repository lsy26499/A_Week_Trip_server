const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    info: Array,
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;

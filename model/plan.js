const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    userId: { type: String, require: true },
    list: Schema.Types.Mixed,
});

PlanSchema.plugin(autoIncrement.plugin, {
    model: 'Plan',
    field: 'order',
    startAt: 1,
    increment: 1,
});

const Plan = mongoose.model('Plan', PlanSchema);

export default Plan;

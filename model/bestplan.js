const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bestPlanSchema = new Schema({
    num: Number,
    list: Array,
    plan: Array,
});

const bestPlan = mongoose.model('BestPlan', bestPlanSchema);

export default bestPlan;

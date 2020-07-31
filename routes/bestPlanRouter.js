import express from 'express';

import bestPlanList from '../controller/bestplanController/bestPlanList';
import bestPlan from '../controller/bestplanController/bestPlan';

const bestPlanRouter = express.Router();

bestPlanRouter.get('/', bestPlanList);
bestPlanRouter.get('/:num', bestPlan);

module.exports = bestPlanRouter;

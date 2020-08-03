import express from 'express';
import planCreate from '../controller/planController/planCreate';
import planDelete from '../controller/planController/planDelete';
import planEdit from '../controller/planController/planEdit';
import planList from '../controller/planController/planList';
import { checkObjectId, checkPlanForm } from '../middlewares';

const planRouter = express.Router();

planRouter.post('/', checkPlanForm, planCreate);
planRouter.put('/:id', checkObjectId, planEdit);
planRouter.delete('/:id', checkObjectId, planDelete);
planRouter.get('/:userId', planList);

export default planRouter;

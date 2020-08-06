import express from 'express';
import planCreate from '../controller/planController/planCreate';
import planDelete from '../controller/planController/planDelete';
import planEdit from '../controller/planController/planEdit';
import planList from '../controller/planController/planList';
import { checkObjectId, checkPlanForm, checkedLogin } from '../middlewares';

const planRouter = express.Router();

planRouter.post('/', checkedLogin, checkPlanForm, planCreate);
planRouter.put('/:id', checkedLogin, checkObjectId, planEdit);
planRouter.delete('/:id', checkedLogin, checkObjectId, planDelete);
planRouter.get('/', planList);

export default planRouter;

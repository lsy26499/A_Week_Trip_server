import express from 'express';
import taskCreate from '../controller/planController/taskCreate';
import taskDelete from '../controller/planController/taskDelete';
import taskEdit from '../controller/planController/taskEdit';
import taskList from '../controller/planController/taskList';
import { checkObjectId, checkPlanForm } from '../middlewares';

const planRouter = express.Router();

planRouter.post('/', checkPlanForm, taskCreate);
planRouter.put('/:id', checkObjectId, taskEdit);
planRouter.delete('/:id', checkObjectId, taskDelete);
planRouter.get('/:id', checkObjectId, taskList);

export default planRouter;

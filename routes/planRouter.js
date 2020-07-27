import express from 'express';
import taskCreate from '../controller/planController/taskCreate';
import taskDelete from '../controller/planController/taskDelete';
import taskEdit from '../controller/planController/taskEdit';
import taskList from '../controller/planController/taskList';
import { checkObjectId } from '../middlewares';

const planRouter = express.Router();

// planRouter.post('/', taskCreate);
// planRouter.put('/', taskEdit);
// planRouter.delete('/', taskDelete);
planRouter.get('/:id', checkObjectId, taskList);

export default planRouter;

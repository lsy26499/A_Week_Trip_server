import express from 'express';
import taskCreate from '../controller/planController/taskCreate';
import taskDelete from '../controller/planController/taskDelete';
import taskEdit from '../controller/planController/taskEdit';
import taskList from '../controller/planController/taskList';

export const planRouter = express.Router();

planRouter.get('/', taskCreate);
planRouter.put('/', taskEdit);
planRouter.delete('/', taskDelete);
planRouter.get('/', taskList);

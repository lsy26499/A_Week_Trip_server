import express from 'express';
import stationList from '../controller/stationController/stationList';
import stationDetail from '../controller/stationController/stationDetail';
import { checkObjectId } from '../middlewares';

const stationRouter = express.Router();

stationRouter.get('/', stationList); // /station
stationRouter.get('/:id', checkObjectId, stationDetail); // /station/:id

export default stationRouter;
